from data import Jobs # inport input classes from data.py
from data import Courses
from data import Student_Profile
import fuzzywuzzy
import Levenshtein
import torch
import json
import random
import numpy as np
import networkx as nx
import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from collections import deque, namedtuple


# Configuration for Mandatory Courses
CORE_NAMES = {'Applied Statistics', 'Data Mining', 'Foundations of Predictive Analytics'}
REQUIRED_NAMES = {'Network and Predictive Analytics', 'Data Visualization', 'Data-Driven Decision Making'}
MANDATORY_COURSES = CORE_NAMES | REQUIRED_NAMES

# ================== GCN-DQN COMPONENTS ==================
class SimpleGCN(nn.Module):
    def __init__(self, in_feat, out_feat):
        super(SimpleGCN, self).__init__()
        self.linear = nn.Linear(in_feat, out_feat)
    def forward(self, x, adj):
        x = torch.spmm(adj, x)
        return F.relu(self.linear(x))

class DQNet(nn.Module):
    def __init__(self, emb_dim, output_dim):
        super(DQNet, self).__init__()
        self.fc = nn.Sequential(nn.Linear(emb_dim, 128), nn.ReLU(), nn.Linear(128, output_dim))
    def forward(self, x): return self.fc(x)

Experience = namedtuple('Experience', ('state', 'action', 'reward', 'next_state', 'done'))

# ================== ADVISOR SYSTEM ==================
class IntegratedGCNAdvisor:
    def __init__(self, jobs:list[Jobs], courses:list[Courses], student_profile:Student_Profile):
        # Convert the pydantic BaseModels jobs and courses to dicts
        self.jobs = [job.model_dump() for job in jobs]
        self.courses = [course.model_dump() for course in courses]

        if not self.jobs or not self.courses:
            raise ValueError("Data loading failed. Check your file paths and JSON format.")

        # convert student_profile to dicts
        self.student_profile = student_profile.model_dump() if student_profile else {}

        # Build Graph and Embeddings
        adj, feats, self.node_list = self._build_kg_matrix()
        gcn_model = SimpleGCN(len(self.node_list), 64)
        self.course_embeddings = gcn_model(feats, adj).detach()

        self.n_courses = len(self.courses)
        self.emb_dim = 64
        self.policy_net = DQNet(self.emb_dim, self.n_courses)
        self.target_net = DQNet(self.emb_dim, self.n_courses)
        self.target_net.load_state_dict(self.policy_net.state_dict())
        self.optimizer = optim.Adam(self.policy_net.parameters(), lr=0.001)
        self.memory = deque(maxlen=2000)

    def _build_kg_matrix(self):
        G = nx.Graph()
        for c in self.courses:
            G.add_node(c['name'], type='course')
            for skill in c['skills_covered']:
                G.add_node(skill, type='skill')
                G.add_edge(c['name'], skill)
        nodes = list(G.nodes())
        adj = nx.adjacency_matrix(G).toarray()
        adj = adj + np.eye(adj.shape[0])
        d = np.diag(np.power(np.array(adj.sum(1)), -0.5).flatten())
        adj_norm = d.dot(adj).dot(d)
        return torch.FloatTensor(adj_norm), torch.FloatTensor(np.eye(len(nodes))), nodes

    def get_state_rep(self, names):
        indices = [self.node_list.index(n) for n in names]
        return torch.mean(self.course_embeddings[indices], dim=0).unsqueeze(0)

    def check_career_potential(self, student_skills, prev_qualified):
        newly_unlocked, highly_competitive = [], []
        for job in self.jobs:
            reqs = set(job['required_skills'])
            match = student_skills & reqs
            if reqs.issubset(student_skills) and job['title'] not in prev_qualified:
                newly_unlocked.append(f"{job['title']} at {job['company']}")
            elif len(match) / len(reqs) >= 0.75 and not reqs.issubset(student_skills):
                highly_competitive.append(job['title'])
        return newly_unlocked, highly_competitive

    def train(self, target_skills, episodes=300):
        # (Standard DQN training logic remains here)
        for _ in range(episodes):
            taken = ['Applied Statistics']
            while len(taken) < 9:
                state_v = self.get_state_rep(taken)
                valid = [i for i, c in enumerate(self.courses) if c['name'] not in taken and all(p in taken for p in c.get('prerequisites', []))]
                if not valid: break
                action_idx = random.choice(valid) if random.random() < 0.2 else torch.argmax(self.policy_net(state_v)).item()
                course = self.courses[action_idx]
                curr_skills = {s for n in taken for c in self.courses if c['name']==n for s in c['skills_covered']}
                reward = (len((set(course['skills_covered']) - curr_skills) & target_skills) * 35) + (45 if course['name'] in MANDATORY_COURSES else 0) - 1
                new_taken = taken + [course['name']]
                self.memory.append(Experience(state_v, action_idx, reward, self.get_state_rep(new_taken), False))
                taken = new_taken
                if len(self.memory) >= 32:
                    batch = random.sample(self.memory, 32)
                    s_b, a_b, r_b, ns_b, _ = zip(*batch)
                    curr_q = self.policy_net(torch.cat(s_b)).gather(1, torch.LongTensor(a_b).unsqueeze(1))
                    next_q = self.target_net(torch.cat(ns_b)).max(1)[0].detach()
                    loss = F.mse_loss(curr_q.squeeze(), torch.FloatTensor(r_b) + (0.95 * next_q))
                    self.optimizer.zero_grad(); loss.backward(); self.optimizer.step()

    def run(self):
        # ================== STUDENT SELECTIONS (NOW FROM JSON IF PROVIDED) ==================
        # Default initial courses and target jobs (original behavior)
        num_start = random.randint(2, 4)
        pool = list(MANDATORY_COURSES - {'Applied Statistics'})
        random.shuffle(pool)
        taken_names = ['Applied Statistics']
        for n in pool:
            if len(taken_names) >= num_start: break
            taken_names.append(n)

        selected_jobs = random.sample(self.jobs, 3)

        # If a student profile is provided, override with user choices
        if self.student_profile:
            # initial_courses from JSON
            json_courses = self.student_profile.get('initial_courses', [])
            # keep only courses that actually exist in the catalog
            valid_course_names = {c['name'] for c in self.courses}
            json_courses = [c for c in json_courses if c in valid_course_names]

            # Ensure "Applied Statistics" is included as in the original logic
            if 'Applied Statistics' not in json_courses and 'Applied Statistics' in valid_course_names:
                json_courses = ['Applied Statistics'] + json_courses

            if json_courses:
                taken_names = json_courses

            # target_jobs from JSON (match by title)
            json_job_titles = set(self.student_profile.get('target_jobs', []))
            matched_jobs = [j for j in self.jobs if j['title'] in json_job_titles]
            if matched_jobs:
                selected_jobs = matched_jobs

        job_skills = {s for j in selected_jobs for s in j['required_skills']}
        report_list = []
        report_list.append("=== STUDENT SELECTIONS ===")
        #changed code to make sure it did not get multiple jobs with the same name
        unique_titles = sorted(list(set(j['title'] for j in selected_jobs)))
        report_list.append(f"Target Jobs: {', '.join(unique_titles)}")
        report_list.append(f"Initial Courses: {', '.join(taken_names)}")

        current_skills = set()
        prev_qualified = []
        for name in taken_names:
            c_data = next(c for c in self.courses if c['name'] == name)
            current_skills.update(c_data['skills_covered'])

        unlocked, _ = self.check_career_potential(current_skills, prev_qualified)
        prev_qualified.extend([u.split(' at ')[0] for u in unlocked])

        report_list.append("[Training GCN-DQN Agent...]")
        self.train(job_skills)

        report_list.append("\n=== OPTIMAL COURSE SEQUENCE & CAREER TRACE ===")
        curr_taken = list(taken_names)
        step = 1
        while len(curr_taken) < 9:
            valid = [i for i, c in enumerate(self.courses) if c['name'] not in curr_taken and all(p in curr_taken for p in c.get('prerequisites', []))]
            if not valid: break
            state_v = self.get_state_rep(curr_taken)
            best_idx = torch.argmax(self.policy_net(state_v) + (torch.full((self.n_courses,), -1e10).index_fill(0, torch.tensor(valid), 0))).item()

            course = self.courses[best_idx]
            new_skills = set(course['skills_covered']) - current_skills
            current_skills.update(new_skills)

            report_list.append(f"Step {step}: {course['name']}")
            report_list.append(f"   + New Skills: {sorted(list(new_skills)) if new_skills else 'None'}")

            unlocked, comp = self.check_career_potential(current_skills, prev_qualified)
            if unlocked:
                report_list.append(f"   >>> NEWLY UNLOCKED CAREERS: {', '.join(unlocked)}")
                prev_qualified.extend([u.split(' at ')[0] for u in unlocked])
            if comp:
                report_list.append(f"   >>> FUTURE POTENTIAL: {', '.join(comp[:3])}")

            curr_taken.append(course['name'])
            step += 1

        # Skill Analysis Report
        intersection = job_skills & current_skills
        gaps = job_skills - current_skills

        report_list.append("\n=== SKILL ANALYSIS REPORT ===")
        report_list.append(f"1) Required Skills for Target Jobs: {sorted(list(job_skills))}")
        report_list.append(f"2) Intersection Skill Sets: {sorted(list(intersection))}")
        report_list.append(f"3) Remaining Skill Gaps: {sorted(list(gaps)) if gaps else 'None'}")

        report_list.append("\n" + "="*40)
        report_list.append("VERIFICATION & COMPLIANCE REPORT")
        report_list.append("="*40)
        missing = MANDATORY_COURSES - set(curr_taken)
        report_list.append(f"CHECK 1: Mandatory Courses: {'PASS' if not missing else 'FAIL'}")
        report_list.append(f"CHECK 2: Job Readiness: {'PASS' if not gaps else 'FAIL'}")
        report_list.append(f"Total Course Load: {len(curr_taken)}/9")
        report_list.append("="*40)
        report = "\n".join(report_list)
        return report


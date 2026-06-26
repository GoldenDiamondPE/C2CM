To make your Python code process the dynamic data sent from your Express backend instead of using mock, randomized inputs from static files, we need to adapt your script.

Here is what you need to change in your Python file (`gcn_advisor.py`) to connect it live to the endpoint your teammate just built.

### 1. Remove Google Colab and Static File Code

Remove the `drive.mount` command, the manual file path references, and the internal text file parsing `load_data` utility.

### 2. Rewrite the Data Fetching Method using `requests`

Modify your initialization logic to pull live `courses` and `jobs` datasets using the `meeting_id` argument sent via the Node.js server command line.

### 3. Replace text print summaries with `json.dumps()`

Instead of sending multiline standard text output across the console, accumulate your optimal values (sequence paths, newly unlocked job paths, skill metrics) into a standard dictionary. Printing it out as a structured JSON object allows your Node server to capture it with `JSON.parse()` and pass it to the React frontend.

---

### Update your Python script (`gcn_advisor.py`) to look like this:

```python
# -*- coding: utf-8 -*-
import sys
import json
import random
import requests  # <-- Make sure 'requests' is installed via pip
import numpy as np
import networkx as nx
import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from collections import deque, namedtuple

# 1. Capture Meeting ID passed from Node.js
if len(sys.argv) < 2:
    print(json.dumps({"error": "Missing meeting ID argument from server node."}))
    sys.exit(1)

meeting_id = sys.argv[1]
API_BASE_URL = "http://localhost:8080"  # Update if using an external deployment URL

# Configurations for Mandatory Courses remain unchanged
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
    def __init__(self, base_url, target_meeting_id):
        # 2. Fetch live data payloads from your teammate's Express endpoint
        endpoint = f"{base_url}/api/meetings/{target_meeting_id}/advisor-data"
        try:
            response = requests.get(endpoint)
            if response.status_code != 200:
                raise ValueError(f"Express server responded with error code {response.status_code}")
            
            payload = response.json()
            self.jobs = payload['jobs']
            self.courses = payload['courses']
        except Exception as e:
            print(json.dumps({"error": f"Failed to gather API details live: {str(e)}"}))
            sys.exit(1)

        if not self.jobs or not self.courses:
            raise ValueError("Target lists are empty. Ensure matching items exist in MongoDB.")

        # Build Graph and Embeddings (Structural matrix logic remains identical)
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
        indices = [self.node_list.index(n) for n in names if n in self.node_list]
        if not indices:
            return torch.zeros(1, self.emb_dim)
        return torch.mean(self.course_embeddings[indices], dim=0).unsqueeze(0)

    def check_career_potential(self, student_skills, prev_qualified):
        newly_unlocked = []
        for job in self.jobs:
            reqs = set(job['required_skills'])
            if reqs.issubset(student_skills) and job['title'] not in prev_qualified:
                newly_unlocked.append(f"{job['title']} at {job['company']}")
        return newly_unlocked

    def train(self, target_skills, episodes=150): # Optimized episodes for real-time API response loops
        for _ in range(episodes):
            taken = ['Applied Statistics'] if any(c['name'] == 'Applied Statistics' for c in self.courses) else [self.courses[0]['name']]
            while len(taken) < 9 and len(taken) < self.n_courses:
                state_v = self.get_state_rep(taken)
                valid = [i for i, c in enumerate(self.courses) if c['name'] not in taken and all(p in taken for p in c.get('prerequisites', []))]
                if not valid: break
                action_idx = random.choice(valid) if random.random() < 0.2 else torch.argmax(self.policy_net(state_v)).item()
                if action_idx not in valid: action_idx = random.choice(valid)
                
                course = self.courses[action_idx]
                curr_skills = {s for n in taken for c in self.courses if c['name'] == n for s in c['skills_covered']}
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
        # 3. Dynamic setup built around the specific checked fields instead of static text samples
        job_skills = {s for j in self.jobs for s in j['required_skills']}
        
        # Train Agent dynamically using extracted target requirements
        self.train(job_skills)

        curr_taken = ['Applied Statistics'] if any(c['name'] == 'Applied Statistics' for c in self.courses) else [self.courses[0]['name']]
        current_skills = set()
        for name in curr_taken:
            c_data = next((c for c in self.courses if c['name'] == name), None)
            if c_data: current_skills.update(c_data['skills_covered'])

        prev_qualified = []
        optimal_sequence = list(curr_taken)
        all_unlocked_careers = []

        while len(curr_taken) < 9 and len(curr_taken) < self.n_courses:
            valid = [i for i, c in enumerate(self.courses) if c['name'] not in curr_taken and all(p in curr_taken for p in c.get('prerequisites', []))]
            if not valid: break
            state_v = self.get_state_rep(curr_taken)
            best_idx = torch.argmax(self.policy_net(state_v) + (torch.full((self.n_courses,), -1e10).index_fill(0, torch.tensor(valid), 0))).item()

            course = self.courses[best_idx]
            new_skills = set(course['skills_covered']) - current_skills
            current_skills.update(new_skills)
            
            optimal_sequence.append(course['name'])
            
            unlocked = self.check_career_potential(current_skills, prev_qualified)
            if unlocked:
                all_unlocked_careers.extend(unlocked)
                prev_qualified.extend([u.split(' at ')[0] for u in unlocked])

            curr_taken.append(course['name'])

        # Compile Skill Analysis Calculations
        gaps = job_skills - current_skills

        # 4. Construct final structured payload dictionary to return to Express
        output_payload = {
            "optimal_sequence": optimal_sequence,
            "unlocked_careers": all_unlocked_careers,
            "skill_gaps": sorted(list(gaps)) if gaps else []
        }

        # Print clean JSON string across process pipe
        print(json.dumps(output_payload))

if __name__ == "__main__":
    advisor = IntegratedGCNAdvisor(base_url=API_BASE_URL, target_meeting_id=meeting_id)
    advisor.run()

```
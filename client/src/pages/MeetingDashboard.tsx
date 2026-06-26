import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface DbItem {
  _id: string;
  name?: string;  // For courses
  title?: string; // For jobs
  company?: string;
}

interface MeetingResponse {
  success: boolean;
  message: string;
}

interface AiResult {
  optimal_sequence: string[];
  unlocked_careers: string[];
  skill_gaps: string[];
}

export default function MeetingDashboard() {
  // Input fields matching your API layout
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [psuId, setPsuId] = useState('');
  
  // Available items fetched from DB
  const [dbCourses, setDbCourses] = useState<DbItem[]>([]);
  const [dbJobs, setDbJobs] = useState<DbItem[]>([]);
  
  // Multiple selections arrays
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
  const [selectedJobIds, setSelectedJobIds] = useState<string[]>([]);
  
  // Status hooks
  const [loading, setLoading] = useState(false);
  const [aiReport, setAiReport] = useState<AiResult | null>(null);

  // Fetch available courses and jobs on load
  useEffect(() => {
    fetch('/api/psu-courses-onet')
      .then((res) => res.json())
      .then((data) => setDbCourses(data))
      .catch((err) => console.error("Error loading courses:", err));

    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => setDbJobs(data))
      .catch((err) => console.error("Error loading jobs:", err));
  }, []);

  // Multi-checkbox togglers
  const toggleCourse = (id: string) => {
    setSelectedCourseIds(prev => 
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  const toggleJob = (id: string) => {
    setSelectedJobIds(prev => 
      prev.includes(id) ? prev.filter(jId => jId !== id) : [...prev, id]
    );
  };

  // Submission handler
  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourseIds.length === 0 || selectedJobIds.length === 0) {
      alert("Please check at least one course and one job.");
      return;
    }

    setLoading(true);
    setAiReport(null);

    try {
      // 1. Post meeting request metadata
      const res = await fetch('/api/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId,
          name,
          psuId,
          courseIds: selectedCourseIds,
          jobIds: selectedJobIds
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert('Meeting Request logged in MongoDB!');
        // 2. Mock calling Brandon's processing child-process route if configured
        // Replace below with your exact python orchestration route when Brandon finishes
        // const aiRes = await fetch(`/api/meetings/${data.meetingId}/run-advisor`, { method: 'POST' });
        // setAiReport(await aiRes.json());
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Advisor Meeting Board | C2CM</title>
      </Helmet>
      
      <h1 className='text-center text-4xl font-bold mb-5'>Advisor Consultation Dashboard</h1>
      
     
    </div>
  );
}
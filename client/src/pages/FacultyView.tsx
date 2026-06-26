import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";

interface MeetingRequest {
  name: string;
  psuId: string;
  courseIds: string[];
  jobIds: string[];
}

interface Course {
  _id: string;
  name: string;
}

interface Job {
  _id: string;
  title: string;
}

// Interface matching Brandon's Python script JSON output format
interface AiReportResult {
  optimal_sequence: string[];
  unlocked_careers: string[];
  skill_gaps: string[];
}

export default function Home() {
  const [meetingRequest, setMeetingRequest] = useState<MeetingRequest | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  
  // New State variables for AI handling
  const [aiReport, setAiReport] = useState<AiReportResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const selectedCourses = courses.filter(course =>
    meetingRequest?.courseIds.includes(course._id)
  );

  const selectedJobs = jobs.filter(job =>
    meetingRequest?.jobIds.includes(job._id)
  );

  const navigate = useNavigate();

  async function fetchMeetingRequest() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/meetings/${localStorage.getItem("requestId")}`
      );
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      setMeetingRequest(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCourses() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/courses`);
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      setCourses(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchJobs() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      setJobs(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetchMeetingRequest();
    fetchCourses();
    fetchJobs();
  }, []);

  // Connected to Node's child_process pipeline executing the Python script
  async function generateReport() {
    const requestId = localStorage.getItem("requestId");
    if (!requestId) {
      alert("No request ID found in memory.");
      return;
    }

    setLoading(true);
    setAiReport(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/meetings/${requestId}/run-advisor`, {
        method: "POST"
      });
      const data = await res.json();

      if (!res.ok) {
        alert(`AI Script Error: ${data.error || "Execution failed"}`);
        return;
      }

      // Store the parsed JSON array from Brandon's script output
      setAiReport(data);
    } catch (error) {
      console.error("Failed executing AI pipeline:", error);
      alert("Network exception occurred while processing script parameters.");
    } finally {
      setLoading(false);
    }
  }

  async function returnToDashboard() {
    navigate("/faculty");
  }

  async function returnToDashboardDelete() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/meetings/${localStorage.getItem("requestId")}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
        return;
      }
      navigate("/faculty");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Advising Report | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Advising Report</h1>
      
      <div className="flex justify-center gap-25">
        <div className="flex flex-col gap-2 mt-15 w-200 max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver bg-white">
          <p className="text-2xl font-bold text-left pb-1">Student Name: {meetingRequest?.name}</p>
          <p className="text-2xl font-bold text-left pb-1">Student PSU ID: {meetingRequest?.psuId}</p>
        </div>
      </div>

      <div className="flex justify-center gap-25">
        <div className="mt-15 w-200 max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver bg-white">
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Selected Baseline Courses</p>
          <div className="max-h-60 overflow-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Name</th>
                </tr>
              </thead>
              <tbody>
                {selectedCourses.map((course) => (
                  <tr key={course._id}>
                    <td className="border p-3">{course.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-15 w-200 max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver bg-white">
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Selected Target Careers</p>
          <div className="max-h-60 overflow-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Title</th>
                </tr>
              </thead>
              <tbody>
                {selectedJobs.map((job) => (
                  <tr key={job._id}>
                    <td className="border p-3">{job.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Dynamic Loading State Indicator */}
      {loading && (
        <div className="text-center mt-10 text-2xl font-semibold animate-pulse text-psuBeaver">
          Executing GCN-DQN Reinforcement Loop... This can take a few seconds.
        </div>
      )}

      {/* Renders the returned data arrays parsed from the Python script side */}
      {aiReport && (
        <div className="mx-auto mt-15 w-full max-w-5xl rounded-xl p-6 text-black border-8 border-emerald-600 bg-white">
          <p className="text-3xl font-black text-left text-emerald-700 pb-3 border-b mb-6">Generated AI Career Blueprint Matrix</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Optimal Curricular Order Sequence:</h3>
              <ol className="list-decimal pl-6 space-y-2 bg-gray-50 p-4 rounded-lg border">
                {aiReport.optimal_sequence.map((courseName, index) => (
                  <li key={index} className="font-medium text-gray-800">{courseName}</li>
                ))}
              </ol>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Newly Unlocked Target Careers:</h3>
                {aiReport.unlocked_careers.length > 0 ? (
                  <ul className="list-disc pl-6 space-y-1 bg-emerald-50 border-emerald-200 border p-4 rounded-lg text-emerald-900">
                    {aiReport.unlocked_careers.map((career, index) => (
                      <li key={index} className="font-semibold">{career}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 bg-gray-50 p-4 rounded-lg border italic">No immediate target modifications unlocked with current inputs.</p>
                )}
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Identified Core Skill Gaps Remaining:</h3>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  {aiReport.skill_gaps.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {aiReport.skill_gaps.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-amber-200 text-amber-900 rounded text-sm font-medium">{skill}</span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-emerald-800 font-semibold italic">Complete baseline capability match! Zero remaining gaps identified.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-25 mt-15 mb-10">
        <button 
          onClick={() => generateReport()} 
          disabled={loading}
          className="flex text-3xl font-semibold text-center bg-psuBeaver hover:bg-psuNittany px-7 py-3 rounded-lg inline-block transition text-white disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Generate Report"}
        </button>
        <button onClick={() => returnToDashboard()} className="flex text-3xl font-semibold text-center bg-psuBeaver hover:bg-psuNittany px-7 py-3 rounded-lg inline-block transition text-white">
          Return
        </button>
        <button onClick={() => returnToDashboardDelete()} className="flex text-3xl font-semibold text-center bg-psuBeaver hover:bg-psuNittany px-7 py-3 rounded-lg inline-block transition text-white">
          Delete
        </button>
      </div>
    </div>
  );
}
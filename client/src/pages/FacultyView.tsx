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

export default function Home() {
  const [meetingRequest, setMeetingRequest] = useState<MeetingRequest | null>(null);
  const [report, setReport] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  //boolean to help show the report data once the button is clicked
  const [showReport, setShowReport] = useState(false);
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
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/courses`
        );

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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/jobs`
      );

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

  async function generateReport() {
    //TODO: Implement the logic to generate the report here
    setShowReport(true);
    const Profile = {
      initial_courses: selectedCourses.map(course => course.name),
      target_jobs: selectedJobs.map(job => job.title),
    };
    const res = await fetch(`${"http://localhost:8000"}/report`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          student_profile: Profile,
          courses,
          jobs
      })
      }
    );
    const data = await res.json();
    setReport(data.report);
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
        <div className="flex justify-center gap-25 mt-15 w-200 max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
          <p className="text-2xl font-bold text-left pb-3 mb-4">Student Name: {meetingRequest?.name}</p>
          <p className="text-2xl font-bold text-left pb-3 mb-4">Student PSU ID: {meetingRequest?.psuId}</p>
        </div>
      </div>

      <div className="flex justify-center gap-25">
        <div className="mt-15 w-200 max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Courses</p>
          <div className="max-h-125 overflow-auto">
            <table className="w-full border border-gray-300">
            <thead>
            <tr className="bg-gray-100">
                <th className="border p-3 text-left">Name</th>
            </tr>
            </thead>

            <tbody>
            {selectedCourses.map((course) => (
                <tr key={course._id}>
                <td className="border p-3">
                    {course.name}
                </td>
                </tr>
            ))}
            </tbody>
            </table>
          </div>
        </div>
        <div className="mt-15 w-200 max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Jobs</p>
          <div className="max-h-125 overflow-auto">
            <table className="w-full border border-gray-300">
            <thead>
            <tr className="bg-gray-100">
                <th className="border p-3 text-left">Name</th>
            </tr>
            </thead>

            <tbody>
            {selectedJobs.map((job) => (
                <tr key={job._id}>
                <td className="border p-3">
                    {job.title}
                </td>
                </tr>
            ))}
            </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-25 mt-15">
        <button onClick={() => generateReport()} className="flex text-3xl font-semibold text-center bg-psuBeaver hover:bg-psuNittany px-7 py-3 rounded-lg inline-block transition text-white">
          Generate Report
        </button>
        <button onClick={() => returnToDashboard()} className="flex text-3xl font-semibold text-center bg-psuBeaver hover:bg-psuNittany px-7 py-3 rounded-lg inline-block transition text-white">
          Return
        </button>
        <button onClick={() => returnToDashboardDelete()} className="flex text-3xl font-semibold text-center bg-psuBeaver hover:bg-psuNittany px-7 py-3 rounded-lg inline-block transition text-white">
          Delete
        </button>
      </div>
      {showReport && (
      <div className=" mt-5 w-full h-70 mx-auto max-w-3xl overflow-y-auto rounded-xl p-6 text-black border-8 border-psuBeaver">
        <pre className="whitespace-pre-wrap text-black font-sans text-lg font-bold">{report}</pre>
      </div>
      )}
    </div>
  );
}
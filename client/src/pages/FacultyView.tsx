import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";

interface MeetingRequest {
  name: string;
  psuId: string;
}


export default function Home() {
  const [meetingRequest, setMeetingRequest] = useState<MeetingRequest | null>(null);
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
  
    useEffect(() => {
      fetchMeetingRequest();
    }, []);

  async function generateReport() {
    //TODO: Implement the logic to generate the report here
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
        </div>
        <div className="mt-15 w-200 max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Jobs</p>
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


    </div>
  );
}
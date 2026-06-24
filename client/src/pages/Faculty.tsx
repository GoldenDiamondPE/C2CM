import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';

interface MeetingRequest {
  _id: string;
  name: string;
}

export default function Home() {
  const [meetingRequests, setMeetingRequests] = useState<MeetingRequest[]>([]);

  async function fetchMeetingRequests() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/meetings`
        );

        const data = await res.json();

        if (!res.ok) {
          console.error(data.message);
          return;
        }

        setMeetingRequests(data);
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    fetchMeetingRequests();
  }, []);

  async function acceptRequest(requestId: string) {
    // Implement the logic to accept the meeting request here
    console.log(`Accepted request with ID: ${requestId}`);
  }

  async function deleteRequest(requestId: string) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/meetings/${requestId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        return;
      }

      // Remove the message
      fetchMeetingRequests();

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Faculty | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Faculty Advisory</h1>
      <div className="flex justify-center gap-25">
        <div className="mt-15 w-200 max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
            <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Meeting Requests</p>

            <div className="max-h-200 overflow-auto">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3 text-left">Name</th>
                    <th className="border p-3 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {meetingRequests.map((request) => (
                    <tr key={request._id}>
                      <td className="border p-3">
                        {request.name}
                      </td>


                      <td className="flex gap-2 border p-3">
                        <button onClick={() => acceptRequest(request._id)} className="flex text-xl font-semibold text-center bg-psuBeaver hover:bg-psuNittany px-5 py-2 rounded-lg inline-block transition text-white">
                          Advise
                        </button>
                        <button onClick={() => deleteRequest(request._id)} className="flex text-xl font-semibold text-center bg-psuBeaver hover:bg-psuNittany px-5 py-2 rounded-lg inline-block transition text-white">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {meetingRequests.length === 0 && (
              <p className="text-center mt-4 text-gray-500">
                No meeting requests found
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
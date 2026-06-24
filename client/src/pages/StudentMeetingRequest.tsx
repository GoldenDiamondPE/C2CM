import { Helmet } from 'react-helmet-async';
import { useState } from "react";

export default function Home() {

    const [name, setName] = useState("");
    const [psuId, setPsuId] = useState("");

    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://coursestocareerpathmapperwa-e5gbh3grh6a6fxbj.eastus-01.azurewebsites.net";

    async function handleMeetingRequest(e: React.FormEvent) {
        e.preventDefault();

        try {
        const res = await fetch(`${API_BASE_URL}/api/meetings`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            studentId: localStorage.getItem("userId"),
            name,
            psuId
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message || "Meeting request failed");
            return;
        }

        alert("Meeting request submitted successfully!");

        } catch (error) {
        console.error(error);
        alert("Server Error");
        }
    }

  return (
    <div>
      <Helmet>
        <title>Student | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Request A Meeting</h1>
      
      <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
        <form onSubmit={handleMeetingRequest} className="space-y-6">
            <div className="pb-5">
              <label htmlFor="name" className="block text-sm font-medium text-psuBeaver">
                Name
              </label> {/*Name Label*/}
          
              <div className="mt-2">
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-psuBeaver sm:text-sm"
                />
              </div> {/*Name Textfield*/}
            </div> {/*Name*/}


            <div className="pb-5">
              <label htmlFor="psuId" className="block text-sm font-medium text-psuBeaver">
                PSU ID
              </label> {/*ID Label*/}
          
              <div className="mt-2">
                <input
                  id="psuId"
                  type="text"
                  name="psuId"
                  required
                  autoComplete="psuId"
                  placeholder="PSU ID"
                  value={psuId}
                  onChange={(e) => setPsuId(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-psuBeaver sm:text-sm"
                />
              </div> {/*ID Textfield*/}
            </div> {/*ID*/}

            
            <div>
              <button
                type="submit"
                className="flex w-full text-3xl font-semibold text-center pb-5 bg-psuBeaver hover:bg-psuNittany px-10 py-3 rounded-lg inline-block transition text-white">
                Request Meeting
              </button>
            </div> {/*Button*/}

        </form>{/*Email + Password + Button*/}
      </div> 
      

    </div>
  );
}
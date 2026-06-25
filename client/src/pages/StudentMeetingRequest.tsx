import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from "react";

interface Course {
  _id: string;
  name: string;
}

export default function Home() {
    const [courses, setCourses] = useState<Course[]>([]);

    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

    const [name, setName] = useState("");
    const [psuId, setPsuId] = useState("");

    const API_BASE_URL = import.meta.env.VITE_API_URL || "https://coursestocareerpathmapperwa-e5gbh3grh6a6fxbj.eastus-01.azurewebsites.net";

    async function handleMeetingRequest(e: React.FormEvent) {
        e.preventDefault();
        console.log("Selected Courses:", selectedCourses);
        try {
        const res = await fetch(`${API_BASE_URL}/api/meetings`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            studentId: localStorage.getItem("userId"),
            name,
            psuId,
            courseIds: selectedCourses
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
    
      useEffect(() => {
        fetchCourses();
      }, []);

    async function handleCheckboxChange(courseId: string) {
        setSelectedCourses(prev =>
            prev.includes(courseId)
            ? prev.filter(id => id !== courseId)
            : [...prev, courseId]
        );
        }

  return (
    <div>
        <Helmet>
            <title>Student | C2CM</title>
        </Helmet>
        <h1 className='text-center text-4xl font-bold mb-5'>Request A Meeting</h1>
        <div className="flex justify-center gap-25">
            <div className="mx-auto max-h-75 mt-15 w-200 max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
                <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Basic Information</p>
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
                </form>{/*Email + Password + Button*/}
            </div>
            <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
                <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Courses</p>
                <div className="max-h-200 overflow-auto">
                    <table className="w-full border border-gray-300">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-3 text-left">Name</th>
                        <th className="border p-3 text-left">Selection</th>
                    </tr>
                    </thead>

                    <tbody>
                    {courses.map((course) => (
                        <tr key={course._id}>
                        <td className="border p-3">
                            {course.name}
                        </td>


                        <td className="text-center border p-3">
                            <input 
                            type="checkbox"
                            value={course._id}
                            checked={selectedCourses.includes(course._id)}
                            onChange={() => handleCheckboxChange(course._id)}
                            /> 
                        </td>
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            </div> 
            <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
                <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Jobs</p>
            </div> 
        </div>
        <div className="flex justify-center gap-25 mt-15">
            <button
                onClick={handleMeetingRequest}
                className="w-auto text-3xl font-semibold text-center pb-5 bg-psuBeaver hover:bg-psuNittany px-10 py-3 rounded-lg inline-block transition text-white">
                Request Meeting
            </button>
        </div>

    </div>
  );
}
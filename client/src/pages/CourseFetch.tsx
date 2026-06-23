import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';

// 1. Map out the TypeScript interface to match your exact MongoDB collection fields
interface PsuCourse {
  _id: string;
  id?: number;
  name?: string;
  course_code?: string;
  course_title?: string;
  credits?: number;
  onets_skills?: string[];
  skills_covered?: string[];
  category?: string;
}

export default function PsuCoursesList() {
  const [psuCourses, setPsuCourses] = useState<PsuCourse[]>([]);

  // 2. Fetch data from matching backend route exactly matching your template style
  async function fetchPsuCourses() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/psu-courses-onet`);
      const data = await res.json();

      if (!res.ok) {
        console.error(data.message || "Failed to fetch courses");
        return;
      }

      setPsuCourses(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPsuCourses();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Courses List | C2CM</title>
      </Helmet>
      
      <h1 className='text-center text-4xl font-bold mb-5'>PSU Courses</h1>
      
      <div className="flex justify-center gap-25">
        {/* Course Information Card Container */}
        <div className="mt-15 w-250 max-w-5xl rounded-xl p-6 text-black border-8 border-psuBeaver">
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Available Courses | psu_courses_onet_skills db</p>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Course Title</th>
                  <th className="border p-3 text-left">Code</th>
                  <th className="border p-3 text-left">Credits</th>
                  <th className="border p-3 text-left">Category</th>
                  <th className="border p-3 text-left">Skills Covered</th>
                </tr>
              </thead>

              <tbody>
                {psuCourses.map((course) => {
                  // Fallback evaluation array variable to extract active payload items safely
                  const activeSkills = 
                    course.skills_covered && course.skills_covered.length > 0 
                      ? course.skills_covered 
                      : course.onets_skills;

                  return (
                    <tr key={course._id}>
                      <td className="border p-3 font-semibold text-indigo-600">
                        {course.name || course.course_title || "Untitled Course"}
                      </td>

                      <td className="border p-3">
                        {course.course_code || `ID: ${course.id}`}
                      </td>

                      <td className="border p-3">
                        {course.credits !== undefined ? course.credits : 3}
                      </td>

                      <td className="border p-3 capitalize">
                        {course.category || "General"}
                      </td>

                      <td className="border p-3 text-sm text-gray-700 max-w-xs">
                        {activeSkills && activeSkills.length > 0 
                          ? activeSkills.join(", ") 
                          : "No skills listed"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {psuCourses.length === 0 && (
            <p className="text-center mt-4 text-gray-500">
              No courses found
            </p>
          )}
        </div>

        
      </div>
    </div>
  );
}
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from "react";
import axios from "axios";

interface Student {
  name: string;
  major: string;
  advisor: string;
  classes: number[];
  jobs: string;
}

interface Course {
  id: number;
  name: string;
  skills_covered: string[];
  prerequisites: string[];
}

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, coursesRes] = await Promise.all([
        axios.get<Student[]>("/api/students"),
        axios.get<Course[]>("/api/courses")
      ]);
        setStudents(studentsRes.data);
        setCourses(coursesRes.data);
      } 
      catch (error) {
        console.error("Error fetching data from API:", error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-5 flex flex-col items-center">
      <Helmet>
        <title>Student and Course Fetch | C2CM</title>
      </Helmet>
      
      <h1 className='text-center text-4xl font-bold mb-5'>Home Page</h1>

      {loading ? (<p>Loading dropdown data...</p>) : (
        <div className="w-full max-w-xs">
          <label htmlFor="school-data" className="block text-sm font-medium text-gray-700 mb-2">
            Select a Student or Course:
          </label>
          
          <select 
            name="school-data" 
            id="school-data"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">-- Choose an option --</option>
            
            <optgroup label="Students">
              {students.map((student, index) => (
                <option key={`student-${index}`} value={student.name}>
                  {student.name}
                </option>
              ))}
            </optgroup>

            <optgroup label="Courses">
              {courses.map((course) => (
                <option key={`course-${course.id}`} value={course.id}>
                  {course.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      )}
    </div>
  );
}
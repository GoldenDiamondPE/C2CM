import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface Program {
  program: string;
  campuses?: string[];
}

export default function Home() {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    studentId: '',
    major: '',
    minor: ''
  });

  const [majors, setMajors] = useState<Program[]>([]);
  const [minors, setMinors] = useState<Program[]>([]);

  // Fetch Majors and Minors on mount
  useEffect(() => {
    // Fetch Majors
    fetch('http://localhost:8080/api/majors')
      .then((res) => res.json())
      .then((data: Program[]) => setMajors(data))
      .catch((err) => console.error("Error fetching majors:", err));

    // Fetch Minors
    fetch('http://localhost:8080/api/minors')
      .then((res) => res.json())
      .then((data: Program[]) => setMinors(data))
      .catch((err) => console.error("Error fetching minors:", err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) alert('Student setup saved!');
  };

  return (
    <div>
      <Helmet>
        <title>Student Setup | C2CM</title>
      </Helmet>
      
      <h1 className='text-center text-4xl font-bold mb-5'>Student Information Setup</h1>
      
      <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
        <form onSubmit={handleSave}>
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Name</p>
          
          <div className="boxContainer">
            <label htmlFor="firstName" className="whitespace-nowrap">First Name:</label>
            <input
              type="text"
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="textFieldBox"
              placeholder="First Name"
            />
          </div>

          <div className="boxContainer">
            <label htmlFor="middleName" className="whitespace-nowrap">Middle Name/Initial:</label>
            <input
              type="text"
              id="middleName"
              value={formData.middleName}
              onChange={(e) => setFormData({...formData, middleName: e.target.value})}
              className="textFieldBox"
              placeholder="Middle"
            />
          </div>

          <div className="boxContainer">
            <label htmlFor="lastName" className="whitespace-nowrap">Last Name:</label>
            <input
              type="text"
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="textFieldBox"
              placeholder="Last Name"
            />
          </div>

          <p className="text-2xl font-bold text-left pb-3 mt-10 border-b mb-4">Student ID</p>
          <div className="boxContainer">
            <label htmlFor="studentIDNumber" className="whitespace-nowrap">Student ID Number:</label>
            <input
              type="text"
              id="studentIDNumber"
              required
              value={formData.studentId}
              onChange={(e) => setFormData({...formData, studentId: e.target.value})}
              className="textFieldBox"
              placeholder="Enter ID..."
            />
          </div>

          <p className="text-2xl font-bold text-left pb-3 mt-10 border-b mb-4">Education</p>
          <div className="boxContainer">
            <label htmlFor="undergradMajor" className="whitespace-nowrap">Major:</label>
            <select 
              id="undergradMajor"
              value={formData.major} 
              onChange={(e) => setFormData({...formData, major: e.target.value})}
              className="textFieldBox" /* Reusing the same styling */
            >
              <option value="">Please choose a major</option>
              {majors.map((item, index) => (
                <option key={index} value={item.program}>{item.program}</option>
              ))}
            </select>
          </div>

          <div className="boxContainer">
            <label htmlFor="undergradMinor" className="whitespace-nowrap">Minor:</label>
            <select 
              id="undergradMinor"
              value={formData.minor} 
              onChange={(e) => setFormData({...formData, minor: e.target.value})}
              className="textFieldBox"
            >
              <option value="">Please choose a minor</option>
              {minors.map((item, index) => (
                <option key={index} value={item.program}>{item.program}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full mt-10 rounded-md bg-psuBeaver px-3 py-3 text-lg font-semibold text-white hover:bg-psuNittany transition-colors">
            Submit Setup
          </button>
        </form>
      </div>
    </div>
  );
}



/*
@student name: (First) (Middle initial) (Last name) [text fields] 
@Student id: textfield 
@Major field of study: (drop down menu) 
@Minor field of study: (drop down menu) 
Courses taken: Allow students to select courses using radio buttons; pre-load the courses they should be taking by programs 
Additional courses taken: text area (enter all courses taken separating each of them with comma) 
skills acquired: Allow students to select skills using radio buttons; pre-load the necessary skills related to their programs 
Additional acquired skills: text area (enter all acquired skills separating each of them with comma) 
 
[Submit button]
*/
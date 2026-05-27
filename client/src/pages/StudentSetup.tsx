import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface Program {
  program: string;
  campuses?: string[];
}

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    studentId: '',
    major: '',
    minor: '',
    skill:''
  });

  const [majors, setMajors] = useState<Program[]>([]);
  const [minors, setMinors] = useState<Program[]>([]);
  const [skills, setSkills] = useState<string[]>([]);


  useEffect(() => {
    // Relative paths ensure it works on Azure and through Vite's proxy
    fetch('/api/majors')
      .then((res) => res.json())
      .then((data) => setMajors(data))
      .catch((err) => console.error("Error:", err));

    fetch('/api/minors')
      .then((res) => res.json())
      .then((data) => setMinors(data))
      .catch((err) => console.error("Error:", err));

    fetch('/api/skills')
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
   e.preventDefault();
    const response = await fetch('/api/enroll', {
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
              className="textFieldBox" 
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

          <p className="text-2xl font-bold text-left pb-3 mt-10 border-b mb-4">Courses</p>
          <div className="boxContainer">
            <label htmlFor="coursesTaken" className="whitespace-nowrap">Courses Taken (Nonfunctional):</label>
            <select 
              id="coursesTaken"
              value={formData.major} 
              onChange={(e) => setFormData({...formData, major: e.target.value})}
              className="textFieldBox" 
            >
              <option value="">Select Classes Taken</option>
              {majors.map((item, index) => (
                <option key={index} value={item.program}>{item.program}</option>
              ))}
            </select>
          </div>

          <div className="boxContainer">
            <label htmlFor="additionalCourses" className="whitespace-nowrap">Enter Additional Courses (Seperated By a Comma):</label>
            <input
              type="text"
              id="additionalCourses"
              value={formData.skill}
              onChange={(e) => setFormData({...formData, skill: e.target.value})}
              className="textFieldBox"
              placeholder="CMPSC101,MATH140"
            />
          </div>

          <p className="text-2xl font-bold text-left pb-3 mt-10 border-b mb-4">Skills</p>
          <div className="boxContainer">
            <label htmlFor="skills" className="whitespace-nowrap">Skills Acquired:</label>
            <select 
              id="skills"
              value={formData.skill} 
              onChange={(e) => setFormData({ ...formData, skill: e.target.value })}
              className="textFieldBox" 
            >
              <option value="">Select a Skill</option>
              {skills.map((skillName, index) => (
                <option key={index} value={skillName}>
                  {skillName}
                </option>
              ))}
            </select>
          </div>

          <div className="boxContainer">
            <label htmlFor="additionalCourses" className="whitespace-nowrap">Enter Additional Courses (Seperated By a Comma):</label>
            <input
              type="text"
              id="additionalCourses"
              value={formData.middleName}
              onChange={(e) => setFormData({...formData, middleName: e.target.value})}
              className="textFieldBox"
              placeholder="CMPSC101,MATH140"
            />
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
@Courses taken: Allow students to select courses using radio buttons; pre-load the courses they should be taking by programs 
@Additional courses taken: text area (enter all courses taken separating each of them with comma) 
skills acquired: Allow students to select skills using radio buttons; pre-load the necessary skills related to their programs 
Additional acquired skills: text area (enter all acquired skills separating each of them with comma) 
 
[Submit button]
*/
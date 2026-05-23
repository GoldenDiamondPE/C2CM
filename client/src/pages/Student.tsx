import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import '../style/App.css';

export default function Home() {
  const [name, setName] = useState('');
  const [programs, setPrograms] = useState<Major[]>([]);
  const [selected, setSelected] = useState<string>('');

  const handleSave = async (e: React.FormEvent) => {
  e.preventDefault();

    const response = await fetch('http://localhost:5000/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name }),
    });

    if (response.ok) alert('Name saved to JSON!');
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/majors')
      .then((res) => res.json())
      .then((data: Major[]) => {
        setPrograms(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  interface Major {
    program: string;
    campuses?: string[]; // Optional if some entries don't have campuses
  }

  return (
    <div>
      <Helmet>
        <title>Student | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Student</h1>
      

      <div className="mx-auto container">
        <div className="mx-auto mt-15 w-full max-w-lg rounded-xl p-6 text-black border-8 border-psuBeaver">
          <p className="text-3xl font-bold text-center pb-5">Completed Courses</p>
        </div>
        <div className="mx-auto mt-15 w-full max-w-lg rounded-xl p-6 text-black border-8 border-psuBeaver">
          <p className="text-3xl font-bold text-center pb-5">Planned Courses</p>
        </div>
        <div className="mx-auto mt-15 w-full max-w-lg rounded-xl p-6 text-black border-8 border-psuBeaver">
          <p className="text-3xl font-bold text-center pb-5">Recommended Courses</p>
        </div>
      </div>

    </div>
  );
}



/*
student name: (First) (Middle initial) (Last name) [text fields] 
Student id: textfield 
Major field of study: (drop down menu) 
Minor field of study: (drop down menu) 
Courses taken: Allow students to select courses using radio buttons; pre-load the courses they should be taking by programs 
Additional courses taken: text area (enter all courses taken separating each of them with comma) 
skills acquired: Allow students to select skills using radio buttons; pre-load the necessary skills related to their programs 
Additional acquired skills: text area (enter all acquired skills separating each of them with comma) 
 
[Submit button]
*/
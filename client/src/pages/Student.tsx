{/*
import { useState, useEffect } from 'react';
*/}
import { Helmet } from 'react-helmet-async';


export default function Home() {
  /*
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
*/
  return (
    <div>
      <Helmet>
        <title>Student | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Student</h1>
      

      <div className="mx-auto boxContainer">
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

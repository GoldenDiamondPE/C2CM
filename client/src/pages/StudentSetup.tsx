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
        <title>Student Setup| C2CM</title>
      </Helmet>
    <h1 className='text-center text-4xl font-bold mb-5'>Student Information Setup</h1>
<div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
      <form onSubmit={handleSave}>
        <p className="text-2xl font-bold text-left pb-3">Name</p>

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="name"
          required
          // Connecting to React state
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" textFieldBox"
          placeholder="Enter name..."
        />
        <br/>
        <label htmlFor="middleName">Middle Name:</label>
        <input
          type="text"
          id="middleName"
          name="name"
          required
          // Connecting to React state
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" textFieldBox"
          placeholder="Enter name..."
        />
         <br/>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="name"
          required
          // Connecting to React state
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" textFieldBox mb-10"
          placeholder="Enter name..."
        />
        <br/>

        <p className="text-2xl font-bold text-left pb-3">Student ID</p>
        <label htmlFor="studentIDNumber">Student ID Number:</label>
        <input
          type="text"
          id="studentIDNumber"
          name="name"
          required
          // Connecting to React state
          value={name}
          onChange={(e) => setName(e.target.value)}
          className=" textFieldBox mb-10"
          placeholder="Enter name..."
        />
        <br/>

        <p className="text-2xl font-bold text-left pb-3">Undergraduate Major</p>
        <div>
          <label htmlFor="undergradMajor">Choose a program: </label>
          
          <select 
            id="undergradMajor"
            value={selected} 
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Please choose an option</option>
            {programs.map((item, index) => (
              <option key={index} value={item.program}>
                {item.program}
              </option>
            ))}
          </select>
        </div>




        <button type="submit" className="flex w-full mt-6 justify-center rounded-md bg-psuBeaver px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Submit</button>
      </form>

      </div>
</div>
  );
}

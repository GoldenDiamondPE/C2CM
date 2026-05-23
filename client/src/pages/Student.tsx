import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import '../style/App.css';
export default function Home() {
  const [name, setName] = useState('');

  const handleSave = async (e) => {
    // preventDefault allows the HTML 'required' and 'minlength' 
    // to validate before the JavaScript runs
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name }),
    });

    if (response.ok) alert('Name saved to JSON!');
  };

  return (
    <div>
      <Helmet>
        <title>Student | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Student Information Setup</h1>
      <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
      <form onSubmit={handleSave}>
        <p className="text-2xl font-bold text-left pb-5">Name</p>

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
        <label htmlFor="name">Middle Name:</label>
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

        <button type="submit" className="flex w-full mt-6 justify-center rounded-md bg-psuBeaver px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Submit</button>
      </form>

      </div>

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
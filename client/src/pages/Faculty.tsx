import { Helmet } from 'react-helmet-async';
/*
// student interface that can be used to store the retrieved students information
interface Student {
  first_name: string;
  middle_initial: string;
  last_name: string;
  id: number;
  major: string;
  minor: string;
  courses: string[];
  additional_courses: string[];
  skills: string[];
  additional_skills: string[];
}

// fake student object used to test the display of the students information
const mockStudent: Student = {
  first_name: "John",
  middle_initial: "D",
  last_name: "Doe",
  id: 123456,
  major: "Computer Science",
  minor: "Mathematics",
  courses: ["Math 140", "CMPSC 360", "CMPEN 270"],
  additional_courses: ["MATH 141", "CMPSC 221"],
  skills: ["Python", "JavaScript","C"],
  additional_skills: ["Java", "C++"]
};
*/
export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Faculty | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Faculty Information Viewer</h1>
      <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
        <form>
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Student Information</p>
          
          <div className="boxContainer">
            <label htmlFor="key" className="whitespace-nowrap">Key:</label>
            <input
              type="text"
              id="key"
              required
              className="textFieldBox"
              placeholder="Key"
            />
          </div>

          <div className="boxContainer">
            <label htmlFor="studentId" className="whitespace-nowrap">ID:</label>
            <input
              type="text"
              id="studentId"
              required
              className="textFieldBox"
              placeholder="Student ID"
            />
          </div>

          <button type="submit" className="w-full mt-10 rounded-md bg-psuBeaver px-3 py-3 text-lg font-semibold text-white hover:bg-psuNittany transition-colors">
            Request Information
          </button>
        </form>
      </div> 
      

      {/* 
      What the faculty page will look like when it displays the student information.
      Make sure the program can retrieve the students information and put it into a student object,
      and be able to make the button functional. After that, you can replace the mockStudent with 
      the real student data and it should display the information correctly.
      
      If you want to test the display of the students information, you can uncomment the code below and 
      comment out the code above. This will allow you to see how the students information will be displayed 
      with the Mock Student Data. 

      <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
        <form>
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Student Information</p>
          <div className="boxContainer">
            <label className="whitespace-nowrap font-bold">Name: {mockStudent.first_name} {mockStudent.middle_initial} {mockStudent.last_name}</label>
          </div>
          <div className="boxContainer">
            <label className="whitespace-nowrap font-bold">ID: {mockStudent.id}</label>
          </div>
          <div className="boxContainer">
            <label className="whitespace-nowrap font-bold">Major: {mockStudent.major}</label>
          </div>
          <div className="boxContainer">
            <label className="whitespace-nowrap font-bold">Minor: {mockStudent.minor}</label>
          </div>
           <div className="boxContainer">
            <label className="whitespace-nowrap font-bold">Courses: </label>            
          </div>
          <div className="boxContainer">
            <ul className="list-disc list-inside ml-17 w-40 h-20 bg-psuBeaver text-white text-bold border-white border-2 p-2 rounded-xl overflow-y-auto">
              {mockStudent.courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
          <div className="boxContainer">
            <label className="whitespace-nowrap font-bold">Additional Courses: </label>
          </div>
          <div className="boxContainer">
            <ul className="list-disc list-inside ml-17 w-40 h-20 bg-psuBeaver text-white text-bold border-white border-2 p-2 rounded-xl overflow-y-auto">
              {mockStudent.additional_courses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
          <div className="boxContainer">
            <label className="whitespace-nowrap font-bold">Skills:</label>
          </div>
          <div className="boxContainer">
            <ul className="list-disc list-inside ml-17 w-40 h-20 bg-psuBeaver text-white text-bold border-white border-2 p-2 rounded-xl overflow-y-auto">
              {mockStudent.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="boxContainer">
            <label className="whitespace-nowrap font-bold">Additional Skills: </label>
          </div>
          <div className="boxContainer">
            <ul className="list-disc list-inside ml-17 w-40 h-20 bg-psuBeaver text-white text-bold border-white border-2 p-2 rounded-xl overflow-y-auto">
              {mockStudent.additional_skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </form>
      </div>
      */} 
    </div>
    
    
  );
}
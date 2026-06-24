import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>All Pages | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>About</h1>
      
      <div className="flex flex-col gap-2">
        <a href="/about" className="hover:text-psuPugh">About</a>
        <a href="/admin" className="hover:text-psuPugh">Admin</a>
        <a href="/allpages" className="hover:text-psuPugh">All Pages</a>
        <a href="/faculty" className="hover:text-psuPugh">Faculty</a>
        <a href="/fileupload" className="hover:text-psuPugh">File Upload</a>
        <a href="/loginmain" className="hover:text-psuPugh">Login Main</a>
        <a href="/loginstudent" className="hover:text-psuPugh">Login Student</a>
        <a href="/loginadmin" className="hover:text-psuPugh">Login Admin</a>
        <a href="/loginfaculty" className="hover:text-psuPugh">Login Faculty</a>
        <a href="/register" className="hover:text-psuPugh">Register</a>
        <a href="/student" className="hover:text-psuPugh">Student</a>
        <a href="/studentcoursefetch" className="hover:text-psuPugh">Student and Course Fetch Demo</a>
        <a href="/coursefetch" className="hover:text-psuPugh">coursefetch</a>
        <a href="/facultyview" className="hover:text-psuPugh">Faculty View</a>
      </div>
    </div>
  );
}
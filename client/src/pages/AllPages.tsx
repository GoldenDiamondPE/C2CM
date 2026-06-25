import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Dev All Pages | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Pages</h1>
      
      <div className="flex flex-col gap-2">
        <a href="/register" className="hover:text-psuPugh">Register</a>
        <a href="/student" className="hover:text-psuPugh">Student</a>
        <a href="/faculty" className="hover:text-psuPugh">Faculty</a>
        <a href="/admin" className="hover:text-psuPugh">Admin</a>
      </div>
    </div>
  );
}
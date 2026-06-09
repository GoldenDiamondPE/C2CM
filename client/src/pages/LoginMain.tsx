import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Login | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Course to Career Path Mapper</h1>

      <p className='text-center text-2xl mb-5'>Welcome to login page for the Course to Career Path Mapper. To use this site please navigate to one of the login options below.</p>

      <div className="mx-auto flex justify-center items-center min-h-50 gap-55 p-4">
            <Link to="/loginstudent" className="text-3xl font-semibold text-center pb-5 bg-psuBeaver hover:bg-psuNittany px-10 py-3 rounded-lg inline-block transition text-white">Student Login</Link>

            <Link to="/loginfaculty" className="text-3xl font-semibold text-center pb-5 bg-psuBeaver hover:bg-psuNittany px-10 py-3 rounded-lg inline-block transition text-white">Faculty Login</Link>

            <Link to="/loginadmin" className="text-3xl font-semibold text-center pb-5 bg-psuBeaver hover:bg-psuNittany px-10 py-3 rounded-lg inline-block transition text-white">Admin Login</Link>
      </div>

    </div>

    
  );
}
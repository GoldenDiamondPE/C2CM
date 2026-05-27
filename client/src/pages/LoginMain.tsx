import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Login | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Course to Career Path Mapper Login</h1>

      <div className="mx-auto flex justify-center items-center min-h-50 gap-55 p-4">
            <Link to="/studentSetup" className="text-3xl font-semibold text-center pb-5 bg-psuBeaver hover:bg-psuNittany px-6 py-3 rounded-lg inline-block transition text-white">Student Login</Link>

            <Link to="/faculty" className="text-3xl font-semibold text-center pb-5 bg-psuBeaver hover:bg-psuNittany px-6 py-3 rounded-lg inline-block transition text-white">Faculty Login</Link>

            <Link to="/admin" className="text-3xl font-semibold text-center pb-5 bg-psuBeaver hover:bg-psuNittany px-6 py-3 rounded-lg inline-block transition text-white">Admin Login</Link>
      </div>

    </div>

    
  );
}
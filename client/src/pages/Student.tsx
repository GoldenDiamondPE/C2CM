import { Helmet } from 'react-helmet-async';


export default function Home() {
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

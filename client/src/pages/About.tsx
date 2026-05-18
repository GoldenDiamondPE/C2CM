import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>About | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>About</h1>
      <p className='text-lg'>
        This is Penn State University assistive tool to help advise on what courses students 
        should select based on their desired occupation. This tool will be able to provide course
        allignment and selection related information, create a course selection plan based off career objectives,
        and adress course advisory related queries with detailed insights.
        </p>
    </div>
  );
}
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Student | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Student</h1>

    </div>
  );
}
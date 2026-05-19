import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Advisor | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Advisor</h1>

    </div>
  );
}
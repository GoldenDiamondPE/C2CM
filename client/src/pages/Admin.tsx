import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Admin | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Admin</h1>

    </div>
  );
}
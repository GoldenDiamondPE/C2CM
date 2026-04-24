import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | C2CM</title>
      </Helmet>
      <h1>Home Page</h1>
      <h1 className='m-400'>Home Page</h1>
    </div>
  );
}
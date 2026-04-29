import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Home Page</h1>
    </div>
  );
}
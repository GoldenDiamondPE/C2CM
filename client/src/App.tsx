import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Student from './pages/Student';
import Advisor from './pages/Advisor';



//import Error from "./pages/Error.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "student", element: <Student /> },
      { path: "advisor", element: <Advisor /> },
      
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
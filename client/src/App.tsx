import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import StudentCourseFetch from './pages/StudentCourseFetch';
import About from './pages/About';
import Login from './pages/Login';
import LoginMain from './pages/LoginMain';
import Student from './pages/Student';
import Faculty from './pages/Faculty';
import Admin from './pages/Admin';
import StudentSetup from './pages/StudentSetup';



//import Error from "./pages/Error.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginMain /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "student", element: <Student /> },
      { path: "faculty", element: <Faculty /> },
      { path: "admin", element: <Admin /> },
      { path: "studentSetup", element: <StudentSetup /> },
      { path: "studentcoursefetch", element: <StudentCourseFetch /> },
      
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
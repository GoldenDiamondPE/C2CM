import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';

import About from './pages/About';
import Admin from './pages/Admin';
import AllPages from './pages/AllPages';
import Faculty from './pages/Faculty';
import LoginMain from './pages/LoginMain';
import LoginTemp from './pages/LoginTemp';
import Student from './pages/Student';
import StudentCourseFetch from './pages/StudentCourseFetch';
import StudentSetup from './pages/StudentSetup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LoginMain /> },
      { path: "about", element: <About /> },
      { path: "admin", element: <Admin /> },
      { path: "allpages", element: <AllPages /> },
      { path: "faculty", element: <Faculty /> },
      { path: "loginmain", element: <LoginMain /> },
      { path: "logintemp", element: <LoginTemp /> },
      { path: "student", element: <Student /> },
      { path: "studentcoursefetch", element: <StudentCourseFetch /> },
      { path: "studentSetup", element: <StudentSetup /> }, 
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
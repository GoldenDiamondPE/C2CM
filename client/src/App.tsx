import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';

import About from './pages/About';
import Admin from './pages/Admin';
import AllPages from './pages/AllPages';
import Faculty from './pages/Faculty';
import FileUpload from './pages/FileUpload';
import LoginMain from './pages/LoginMain';
import Register from './pages/Register';
import LoginStudent from './pages/LoginStudent';
import LoginAdmin from './pages/LoginAdmin';
import LoginFaculty from './pages/LoginFaculty';
import StudentCourseFetch from './pages/StudentCourseFetch';
import StudentSetup from './pages/StudentSetup';
import Demo from './pages/zDemo';
import FacultyView from './pages/FacultyView';

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
      { path: "fileupload", element: <FileUpload />},
      { path: "loginmain", element: <LoginMain /> },
      { path: "loginstudent", element: <LoginStudent /> },
      { path: "loginadmin", element: <LoginAdmin /> },
      { path: "loginfaculty", element: <LoginFaculty /> },
      { path: "studentcoursefetch", element: <StudentCourseFetch /> },
      { path: "student", element: <StudentSetup /> }, 
      { path: "demo", element: <Demo /> },
      { path: "facultyview", element: <FacultyView /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
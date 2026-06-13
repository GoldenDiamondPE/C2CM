import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function RootLayout() {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="flex flex-col min-h-svh">
      
      <header className="sticky top-0 z-50 bg-psuBeaver text-white p-4">
        <nav className="flex justify-between items-center">
          <div className="font-bold text-xl">Course to Career Path Mapper</div>
          <div className="space-x-8">
            <Link to="/" className="hover:text-psuPugh">Home</Link>
            <Link to="/about" className="hover:text-psuPugh">About</Link>
            <Link to="/allpages" className="hover:text-psuPugh">All Pages</Link>
          </div>
        </nav>
      </header>

      {/*Body Contents */}
      <main className="grow p-6">
        <Outlet />
      </main>

      {/*Footer*/}
      <footer className="p-4 bg-psuBeaver text-white flex justify-end items-center gap-4">
        {/*{email && ( todo add this back later
          <>
            <span>
              Logged in as: <strong>{email}</strong> ({role})     
            </span>
          </>
        )}*/}
            <button
                onClick={handleLogout}
                className="hover:text-psuPugh">
                Logout
            </button>
      </footer>

    </div>
  );
}
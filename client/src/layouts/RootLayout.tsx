import { Link, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-svh">
      
      <header className="sticky top-0 z-50 bg-psuBeaver text-white p-4">
        <nav className="flex justify-between items-center">
          <div className="font-bold text-xl">Course to Career Path Mapper</div>
          <div className="space-x-8">
            <Link to="/" className="hover:text-psuPugh">Home</Link>
            <Link to="/login" className="hover:text-psuPugh">Login</Link>
            <Link to="/about" className="hover:text-psuPugh">About</Link>
          </div>
        </nav>
      </header>

      {/*Body Contents */}
      <main className="grow p-6">
        <Outlet />
      </main>

      {/*Footer*/}
      <footer className="p-4 bg-psuBeaver text-gray-300 text-center">
        Course to Carrer Path Mapper PSU
      </footer>

    </div>
  );
}
import { Link, Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-svh">
      
      <header className="sticky top-0 z-50 bg-gray-800 text-white p-4">
        <nav className="flex justify-between items-center">
          <div className="font-bold text-xl">Course to Career Path Mapper</div>
          <div className="space-x-10">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/about" className="hover:text-blue-400">About</Link>
          </div>
        </nav>
      </header>

      {/*Body Contents */}
      <main className="grow p-6">
        <Outlet />
      </main>

      {/*Footer*/}
      <footer className="p-4 bg-gray-800 text-gray-300 text-center">
        Course to Carrer Path Mapper PSU
      </footer>

    </div>
  );
}
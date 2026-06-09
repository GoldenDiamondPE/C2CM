import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Login Admin | C2CM</title>
      </Helmet>

      <div className="mx-auto mt-15 w-full max-w-lg rounded-xl p-6 text-black border-8 border-psuBeaver">
        <p className="text-3xl font-bold text-center pb-5">Admin Login</p>

        <form action="#" method="POST" className="space-y-6">
            <div pb-5>
              <label htmlFor="email" className="block text-sm font-medium text-psuBeaver">
                Email address
              </label> {/*Email Label*/}
          
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-psuBeaver sm:text-sm"
                />
              </div> {/*Email Textfield*/}
            </div> {/*Email*/}


            <div pb-5>
              <label htmlFor="password" className="block text-sm font-medium text-psuBeaver">
                Password
              </label> {/*Password Label*/}
          
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  name="password"
                  required
                  autoComplete="password"
                  placeholder="Password"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-psuBeaver sm:text-sm"
                />
              </div> {/*Password Textfield*/}
            </div> {/*Password*/}
          

             <div>
              {/*<button type="submit" className="flex w-full justify-center rounded-md bg-psuBeaver px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Sign in</button>
              */}
              <Link to="/admin" className="flex w-full text-3xl font-semibold text-center pb-5 bg-psuBeaver hover:bg-psuNittany px-10 py-3 rounded-lg inline-block transition text-white">Sign In</Link>
            </div> {/*Button*/}

        </form>{/*Email + Password + Button*/}




      </div>{/*Box*/}
    </div>
  );
}
import { Helmet } from 'react-helmet-async';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // store role (simple prototype approach)
    localStorage.setItem("role", data.role);
    localStorage.setItem("email", data.email);
    localStorage.setItem("isLoggedIn", "true");

    // redirect based on role
    if (data.role === "admin") {
      navigate("/admin");
    } else if (data.role === "faculty") {
      navigate("/faculty");
    } else {
      navigate("/student");
    }
    window.location.reload();//reload the footer to remove the logged-in user display
  }
  return (
    <div>
      <Helmet>
        <title>Login Admin | C2CM</title>
      </Helmet>

      <div className="mx-auto mt-15 w-full max-w-lg rounded-xl p-6 text-black border-8 border-psuBeaver">
        <p className="text-3xl font-bold text-center pb-5">Admin Login</p>

        <form onSubmit={handleLogin} className="space-y-6">
            <div className="pb-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-psuBeaver sm:text-sm"
                />
              </div> {/*Email Textfield*/}
            </div> {/*Email*/}


            <div className="pb-5">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-psuBeaver sm:text-sm"
                />
              </div> {/*Password Textfield*/}
            </div> {/*Password*/}
          

            <div>
              <button
                type="submit"
                className="flex w-full text-3xl font-semibold text-center pb-5 bg-psuBeaver hover:bg-psuNittany px-10 py-3 rounded-lg inline-block transition text-white">
                Sign In
              </button>
            </div> {/*Button*/}

        </form>{/*Email + Password + Button*/}
      </div>{/*Box*/}
    </div>
  );
}
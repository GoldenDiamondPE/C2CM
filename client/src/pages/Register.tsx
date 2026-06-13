import { Helmet } from 'react-helmet-async';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");


  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      // optional: auto-login after register
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("isLoggedIn", "true");

      // redirect to appropriate page
      if (role === "admin") navigate("/admin");
      else if (role === "faculty") navigate("/faculty");
      else navigate("/student");

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  }

  return (
    <div>
      <Helmet>
        <title>Register | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Register A New Account</h1>
      
      <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
        <form onSubmit={handleRegister} className="space-y-6">
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

            <div className="flex justify-center gap-6 text-sm font-medium text-psuBeaver">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === "student"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Student
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="faculty"
                  checked={role === "faculty"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Faculty
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Admin
              </label>
            </div>
          

            <div>
              <button
                type="submit"
                className="flex w-full text-3xl font-semibold text-center pb-5 bg-psuBeaver hover:bg-psuNittany px-10 py-3 rounded-lg inline-block transition text-white">
                Register
              </button>
            </div> {/*Button*/}

        </form>{/*Email + Password + Button*/}
      </div> 
    </div>
  );
}
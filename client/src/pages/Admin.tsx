import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';

interface User {
  _id: string;
  email: string;
  role: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  async function fetchUsers() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/users`
        );

        const data = await res.json();

        if (!res.ok) {
          console.error(data.message);
          return;
        }

        setUsers(data);
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function deleteUser(id: string) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data.message);
        return;
      }

      // Remove the deleted user from the state
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  }

  async function editUser(id: string) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/users/${id}`, {
        method: "PUT",
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
        console.error(data.message);
        return;
      }

      fetchUsers();
      setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id
          ? { ...user, email, role } // update only changed fields
          : user
      )
    );

    } catch (error) {
      console.error(error);
    }
  }

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

      // Clear the form
      setEmail("");
      setPassword("");
      setRole("student");

      // Refresh the user list
      const res2 = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/users`
      );

      const data2 = await res2.json();

      if (!res2.ok) {
        console.error(data2.message);
        return;
      }

      setUsers(data2);
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  }

  return (
    <div>
      <Helmet>
        <title>Admin | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>Admin Account Management</h1>
      <div className="flex justify-center gap-25">
        <div className="mt-15 w-200 max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
            <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Account Information</p>

            <div className="max-h-200 overflow-auto">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3 text-left">Email</th>
                    <th className="border p-3 text-left">Role</th>
                    <th className="border p-3 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="border p-3">
                        {user.email}
                      </td>

                      <td className="border p-3">
                        {user.role}
                      </td>

                      <td className="flex gap-2 border p-3">
                        <button onClick={() => deleteUser(user._id)} className="flex text-xl font-semibold text-center bg-psuBeaver hover:bg-psuNittany px-5 py-2 rounded-lg inline-block transition text-white">
                          Delete
                        </button>
                        <button onClick={() => editUser(user._id)} className="flex text-xl font-semibold text-center bg-psuBeaver hover:bg-psuNittany px-5 py-2 rounded-lg inline-block transition text-white">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {users.length === 0 && (
              <p className="text-center mt-4 text-gray-500">
                No users found
              </p>
            )}
        </div>
        <div className="my-auto mt-15 w-100 max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Register/Edit Accounts</p>
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
    </div>
  );
}
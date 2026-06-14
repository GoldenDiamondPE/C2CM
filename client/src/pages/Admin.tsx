import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';

interface User {
  _id: string;
  email: string;
  role: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
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
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Admin | C2CM</title>
      </Helmet>
      <h1 className='text-center text-4xl font-bold mb-5'>WIP Admin Account Management WIP</h1>
      
      <div className="mx-auto mt-15 w-full max-w-3xl rounded-xl p-6 text-black border-8 border-psuBeaver">
          <p className="text-2xl font-bold text-left pb-3 border-b mb-4">Accounts</p>

          <div className="overflow-x-auto">
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

                    <td className="border p-3">
                      <button onClick={() => deleteUser(user._id)} className="flex text-xl font-semibold text-center bg-psuBeaver hover:bg-psuNittany px-5 py-2 rounded-lg inline-block transition text-white">
                        Delete
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
    </div>
  );
}
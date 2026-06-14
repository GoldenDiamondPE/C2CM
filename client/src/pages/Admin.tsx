import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`);
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message || "Failed to fetch users");
        return;
      }

      setUsers(data);
    } catch (error) {
      console.error("Server error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center text-xl">Loading users...</p>;
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
            <table className="w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Role</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>

              {/*<tbody> TODO
                {users.map((user) => (
                  <tr key={user.id} className="text-center">
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border">{user.role}</td>
                    <td className="p-3 border">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>*/}
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
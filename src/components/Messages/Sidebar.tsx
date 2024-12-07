import { useEffect, useState } from "react";
import { User } from "../../types/types";

function Sidebar({ fetchUsers }: { fetchUsers: () => Promise<User[]> }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getUsers = async () => {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      setLoading(false);
    };
    getUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user: User) => (
            <li key={user.id}>
              <p>{user.username}</p>
              <img src={user.avatarUrl} alt="user avatar" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;

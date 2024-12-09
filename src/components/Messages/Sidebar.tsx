import { useEffect, useState } from "react";
import { User, Message } from "../../types/types";
import { fetchMessages, fetchUsers } from "../../utils/api";
interface SidebarProps {
  setMessages: (messages: Message[]) => void;
}

function Sidebar({ setMessages }: SidebarProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleUserClick = async (userId: number) => {
    try {
      const userMessages = await fetchMessages({ userId });
      setMessages(userMessages);
    } catch (error) {
      console.error("Error fetching messages for user:", error);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleUserClick(user.id)}>
              <p>{user.username}</p>
              <img src={user.avatarUrl} alt={`${user.username}'s avatar`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Sidebar;

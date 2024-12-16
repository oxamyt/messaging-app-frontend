import { useEffect, useState } from "react";
import { User, Message } from "../../types/types";
import { fetchMessages, fetchUsers } from "../../utils/api";
import { FaUsers } from "react-icons/fa";

interface SidebarProps {
  setMessages: (messages: Message[]) => void;
  setReceiverId: (id: number) => void;
}

function Sidebar({ setMessages, setReceiverId }: SidebarProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers("auth/users");
        setUsers(fetchedUsers || []);
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
      setIsOpen(false);
      setReceiverId(userId);
    } catch (error) {
      console.error("Error fetching messages for user:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 left-4 z-40 p-2 bg-nord7 text-nord6 rounded-full shadow-md focus:outline-none hover:bg-nord8"
      >
        <FaUsers className="w-5 h-5" />
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-nord5 text-nord0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-nord3">
          <h2 className="text-lg font-semibold">Users</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-nord0 hover:text-nord11 focus:outline-none"
          >
            ✖
          </button>
        </div>
        {loading ? (
          <p className="p-4 text-nord4">Loading...</p>
        ) : (
          <ul className="p-4 space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex items-center space-x-3 cursor-pointer hover:bg-nord3 p-2 rounded-md"
                onClick={() => handleUserClick(user.id)}
              >
                <img
                  src={user.avatarUrl}
                  alt={`${user.username}'s avatar`}
                  className="w-12 h-12 rounded-full"
                />
                <p className="text-md">{user.username}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Sidebar;

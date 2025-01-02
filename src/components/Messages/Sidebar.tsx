import { useEffect, useState } from "react";
import { User, GroupChat } from "../../types/types";
import { fetchUsers } from "../../utils/api";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoChatboxEllipses } from "react-icons/io5";
import { getRequest } from "../../utils/api";

function Sidebar() {
  const [users, setUsers] = useState<User[]>([]);
  const [groupChats, setGroupChats] = useState<GroupChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const navigate = useNavigate();

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
    const getGroupChats = async () => {
      try {
        const fetchedGroupChats = await getRequest("message/group");
        setGroupChats(fetchedGroupChats.groupChats || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
    getGroupChats();
  }, []);

  const handleUserClick = (userId: number) => {
    navigate(`/messages/${userId}`);
    setIsLeftOpen(false);
    setIsRightOpen(false);
  };

  const handleGroupClick = (groupId: number) => {
    navigate(`/group/${groupId}`);
    setIsLeftOpen(false);
    setIsRightOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsLeftOpen(true)}
        className="fixed top-16 left-6 z-40 p-2 bg-nord7 text-nord6 rounded-full shadow-md focus:outline-none hover:bg-nord8"
      >
        <FaUsers className="w-6 h-6" />
      </button>

      <button
        onClick={() => setIsRightOpen(true)}
        className="fixed top-16 right-6 z-40 p-2 bg-nord7 text-nord6 rounded-full shadow-md focus:outline-none hover:bg-nord8"
      >
        <IoChatboxEllipses className="w-6 h-6" />
      </button>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-nord5 text-nord0 transform ${
          isLeftOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-nord3">
          <h2 className="text-lg font-semibold">Users</h2>
          <button
            onClick={() => setIsLeftOpen(false)}
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
                aria-label={`User ${user.username}`}
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

      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-nord5 text-nord0 transform ${
          isRightOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-nord3">
          <h2 className="text-lg font-semibold">Group Chats</h2>
          <button
            onClick={() => setIsRightOpen(false)}
            className="text-nord0 hover:text-nord11 focus:outline-none"
          >
            ✖
          </button>
        </div>
        {loading ? (
          <p className="p-4 text-nord4">Loading...</p>
        ) : (
          <ul className="p-4 space-y-4">
            {groupChats.map((groupChat) => (
              <li
                key={groupChat.id}
                className="flex items-center space-x-3 cursor-pointer hover:bg-nord3 p-2 rounded-md"
                onClick={() => handleGroupClick(groupChat.id)}
                aria-label={`User ${groupChat.name}`}
              >
                <img
                  src={groupChat.avatarUrl}
                  alt={`${groupChat.name}'s avatar`}
                  className="w-12 h-12 rounded-full"
                />
                <p className="text-md">{groupChat.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Sidebar;

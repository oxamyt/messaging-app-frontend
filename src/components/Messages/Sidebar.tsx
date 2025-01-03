import { useEffect, useState } from "react";
import { User, GroupChat } from "../../types/types";
import { fetchUsers, postRequest, deleteRequest } from "../../utils/api";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoChatboxEllipses } from "react-icons/io5";
import { getRequest } from "../../utils/api";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function Sidebar() {
  const [users, setUsers] = useState<User[]>([]);
  const [groupChats, setGroupChats] = useState<GroupChat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isGroupInputVisible, setIsGroupInputVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const userId = localStorage.getItem("id") || null;
  const parsedUserId = userId ? parseInt(userId) : null;
  const navigate = useNavigate();

  const handleAddGroupClick = () => {
    setIsGroupInputVisible((prev) => !prev);
  };

  const submitGroup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await postRequest("message/group", {
        name: groupName,
      });
      setGroupName("");
      await getGroupChats();
    } catch (error) {
      console.error("Error creating group:", error);
    } finally {
      setIsGroupInputVisible((prev) => !prev);
    }
  };

  const getGroupChats = async () => {
    try {
      const fetchedGroupChats = await getRequest("message/group");
      setGroupChats(fetchedGroupChats.groupChats || []);
    } catch (error) {
      console.error("Error fetching group chats:", error);
    }
  };

  const deleteGroupChat = async ({ groupId }: { groupId: number }) => {
    try {
      await deleteRequest(`message/${groupId}`);
      await getGroupChats();
    } catch (err) {
      console.error(err);
    }
  };

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
          <div className="flex gap-2 items-center justify-center">
            <IoIosAddCircle
              onClick={handleAddGroupClick}
              size={24}
              className=" bg-nord7 text-nord6 rounded-lg shadow-md"
            />
            <h2 className="text-lg font-semibold">Group Chats</h2>
          </div>
          <button
            onClick={() => setIsRightOpen(false)}
            className="text-nord0 hover:text-nord11 focus:outline-none"
          >
            ✖
          </button>
        </div>
        {isGroupInputVisible && (
          <div className="p-4">
            <form onSubmit={submitGroup}>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                className="w-full p-2 border border-nord3 rounded-md focus:outline-none focus:border-nord8"
              />
              <button
                type="submit"
                className="mt-2 p-2 w-full bg-nord7 text-nord6 rounded-md hover:bg-nord8"
              >
                Create Group
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p className="p-4 text-nord4">Loading...</p>
        ) : (
          <ul className="p-4 space-y-4">
            {groupChats.map((groupChat) => (
              <li
                key={groupChat.id}
                className="flex items-center justify-between space-x-3 cursor-pointer hover:bg-nord3 p-2 rounded-md"
                onClick={() => handleGroupClick(groupChat.id)}
                aria-label={`User ${groupChat.name}`}
              >
                <div className="flex items-center space-x-3 cursor-pointer ">
                  <img
                    src={groupChat.avatarUrl}
                    alt={`${groupChat.name}'s avatar`}
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="text-md">{groupChat.name}</p>
                </div>

                {parsedUserId === groupChat.creatorId && (
                  <MdDelete
                    size={24}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteGroupChat({ groupId: groupChat.id });
                    }}
                    className="text-nord11"
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Sidebar;

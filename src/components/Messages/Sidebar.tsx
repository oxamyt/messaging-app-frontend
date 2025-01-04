import { useEffect, useState } from "react";
import { User, GroupChat } from "../../types/types";
import { fetchUsers, postRequest, deleteRequest } from "../../utils/api";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoChatboxEllipses } from "react-icons/io5";
import { getRequest } from "../../utils/api";
import UserList from "../common/UserList";
import GroupList from "../common/GroupList";

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
        <UserList
          users={users}
          loading={loading}
          handleUserClick={handleUserClick}
          setIsLeftOpen={setIsLeftOpen}
        />
      </div>

      <div
        className={`fixed inset-y-0 right-0 z-40 w-64 bg-nord5 text-nord0 transform ${
          isRightOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg`}
      >
        <GroupList
          handleAddGroupClick={handleAddGroupClick}
          setIsRightOpen={setIsRightOpen}
          isGroupInputVisible={isGroupInputVisible}
          submitGroup={submitGroup}
          groupName={groupName}
          setGroupName={setGroupName}
          loading={loading}
          groupChats={groupChats}
          handleGroupClick={handleGroupClick}
          parsedUserId={parsedUserId}
          deleteGroupChat={deleteGroupChat}
        />
      </div>
    </>
  );
}

export default Sidebar;

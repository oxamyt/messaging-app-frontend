import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { GroupChat } from "../../types/types";
import GroupForm from "./GroupForm";

interface GroupListProps {
  handleAddGroupClick: () => void;
  setIsRightOpen: (isOpen: boolean) => void;
  isGroupInputVisible: boolean;
  submitGroup: (e: React.FormEvent) => Promise<void>;
  groupName: string;
  setGroupName: (name: string) => void;
  loading: boolean;
  groupChats: GroupChat[];
  handleGroupClick: (groupId: number) => void;
  parsedUserId: number | null;
  deleteGroupChat: (params: { groupId: number }) => void;
}

function GroupList({
  handleAddGroupClick,
  setIsRightOpen,
  isGroupInputVisible,
  submitGroup,
  groupName,
  setGroupName,
  loading,
  groupChats,
  handleGroupClick,
  parsedUserId,
  deleteGroupChat,
}: GroupListProps) {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-nord3">
        <div className="flex gap-2 items-center justify-center">
          <IoIosAddCircle
            onClick={handleAddGroupClick}
            size={24}
            className=" bg-nord7 cursor-pointer text-nord6 rounded-lg shadow-md"
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
        <GroupForm
          submitGroup={submitGroup}
          groupName={groupName}
          setGroupName={setGroupName}
        />
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
    </>
  );
}

export default GroupList;

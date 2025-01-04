import { User } from "../../types/types";

interface UserListProps {
  users: User[];
  loading: boolean;
  handleUserClick: (userId: number) => void;
  setIsLeftOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserList({
  users,
  loading,
  handleUserClick,
  setIsLeftOpen,
}: UserListProps) {
  return (
    <>
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
    </>
  );
}

export default UserList;

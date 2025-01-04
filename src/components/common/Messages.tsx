import { Link } from "react-router-dom";
import { Message } from "../../types/types";

function Messages({
  messages,
  parsedUserId,
}: {
  messages: Message[];
  parsedUserId: number | null;
}) {
  return (
    <ul className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4">
      {!messages ? (
        <li className="text-center text-nord7 italic">Loading messages...</li>
      ) : messages.length === 0 ? (
        <li className="text-center text-nord7 italic">No messages yet</li>
      ) : (
        messages.map((message) => (
          <li
            key={message.id}
            className={`flex space-x-4 p-3 items-center rounded-lg break-all shadow-md ${
              message.senderId === parsedUserId
                ? "self-end bg-nord5 text-black"
                : "self-start bg-nord9 text-white"
            }`}
          >
            <img
              src={message.sender.avatarUrl}
              alt={`${message.sender.username}'s avatar`}
              className="w-8 h-8 rounded-full"
            />
            <div className="w-full">
              <Link
                to={`/user/${message.sender.id}`}
                className="text-sm font-semibold"
              >
                {message.sender.username}
              </Link>

              {message.content &&
              message.content.startsWith("http") &&
              message.content.match(/\.(jpeg|jpg|gif|png)$/) ? (
                <img
                  src={message.content}
                  alt="Message image"
                  className="mt-2 max-w-60 max-h-60 rounded-lg"
                />
              ) : (
                <p>{message.content}</p>
              )}
            </div>
          </li>
        ))
      )}
    </ul>
  );
}

export default Messages;

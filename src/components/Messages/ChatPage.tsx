import { useState } from "react";
import { Message } from "../../types/types";
import { handleSubmit } from "../../utils/handlers";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";

function ChatPage({
  messages,
  receiverId,
}: {
  messages: Message[];
  receiverId: number;
}) {
  const [content, setContent] = useState("");
  const [responseOnSubmit, setResponseOnSubmit] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleSubmit(e, "message", {
      receiverId: String(receiverId),
      content,
    });
    setContent("");
    setResponseOnSubmit(true);
    setTimeout(() => {
      setResponseOnSubmit(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-nord6 text-nord0">
      {responseOnSubmit && (
        <div className="fixed z-100 top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg bg-green-500 flex items-center">
          <IoIosCheckmarkCircle className="text-white" size={24} />
          ``
          <span className="text-white">Message sent!</span>
        </div>
      )}
      <ul className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4">
        {!messages ? (
          <li className="text-center text-nord7 italic">Loading messages...</li>
        ) : messages.length === 0 ? (
          <li className="text-center text-nord7 italic">No messages yet</li>
        ) : (
          messages.map((message) => (
            <li
              key={message.id}
              className={`flex space-x-4 p-3 items-center rounded-lg  break-all hadow-md ${
                message.senderId === receiverId
                  ? "self-start bg-nord9 text-white"
                  : "self-end bg-nord5 text-black"
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
                <p>{message.content}</p>
              </div>
            </li>
          ))
        )}
      </ul>

      <form
        onSubmit={handleFormSubmit}
        role="form"
        className="p-4 bg-nord5 select-none flex items-center justify-center space-x-2 border-t sticky bottom-0 border-nord3"
      >
        <textarea
          role="message-input"
          name="content"
          value={content}
          minLength={2}
          maxLength={300}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="Type your message..."
          className="flex-1 p-2 bg-nord6 h-10 text-nord0 rounded-2xl resize-none"
        ></textarea>

        {responseOnSubmit && <p className="text-nord14">{responseOnSubmit}</p>}
        <button
          type="submit"
          className="p-2 h-10 bg-nord7 text-nord6 font-semibold flex justify-center items-center  shadow-md rounded-lg hover:bg-nord8 transition"
        >
          <IoSend />
        </button>
      </form>
    </div>
  );
}

export default ChatPage;

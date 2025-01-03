import { useState } from "react";
import { Message } from "../../types/types";
import { handleSubmit } from "../../utils/handlers";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import { FaRegFileImage } from "react-icons/fa";
import { postRequest } from "../../utils/api";

function ChatPage({
  messages,
  receiverId,
  groupId,
  isGroupChat,
  refreshMessages,
}: {
  messages: Message[];
  isGroupChat: boolean;
  receiverId?: number;
  groupId?: string;
  refreshMessages: () => void;
}) {
  const [content, setContent] = useState("");
  const [imageForm, setImageForm] = useState(false);
  const userId = localStorage.getItem("id");
  const parsedUserId = userId ? parseInt(userId, 10) : null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleSubmit(e, isGroupChat ? `message/${groupId}` : "message", {
      ...(receiverId && { receiverId: String(receiverId) }),
      content,
    });
    setContent("");
    refreshMessages();
  };

  const handleImageFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    if (isGroupChat && groupId) {
      formData.append("groupId", String(groupId));
    } else if (receiverId) {
      formData.append("receiverId", String(receiverId));
    }
    try {
      await postRequest("message/image", formData);
      refreshMessages();
      setImageForm(false);
    } catch (err) {
      console.error("Error updating avatar:", err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-nord6 text-nord0">
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

      {imageForm && (
        <div className="fixed   inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form
              className="flex flex-col items-center"
              onSubmit={handleImageFormSubmit}
              encType="multipart/form-data"
            >
              <input type="file" name="image" required className="mb-4" />
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-nord14 text-white py-2 px-4 rounded"
                >
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => setImageForm(false)}
                  className="bg-nord12 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <form
        onSubmit={handleFormSubmit}
        role="form"
        className="p-4 bg-nord5 select-none flex items-center justify-center space-x-2 border-t  border-nord3"
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

        <FaRegFileImage
          onClick={() => setImageForm(!imageForm)}
          className="p-2 w-10 h-10 bg-nord7 text-nord6  cursor-pointer  shadow-md rounded-lg hover:bg-nord8 transition"
        />

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

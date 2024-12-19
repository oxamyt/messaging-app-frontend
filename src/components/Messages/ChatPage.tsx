import { useState } from "react";
import { Message } from "../../types/types";
import { handleSubmit } from "../../utils/handlers";

function ChatPage({
  messages,
  receiverId,
}: {
  messages: Message[];
  receiverId: number;
}) {
  const [content, setContent] = useState("");
  const [responseOnSubmit, setResponseOnSUbmit] = useState("");
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleSubmit(e, "message", {
      receiverId: String(receiverId),
      content,
    });
    setContent("");
    setResponseOnSUbmit("Message sent!");
  };

  return (
    <div className="flex flex-col h-full  bg-nord6 text-nord0">
      <ul className="flex flex-col flex-1 overflow-y-auto p-4 space-y-4 ">
        {!messages ? (
          <li className="text-center text-nord7 italic">Loading messages...</li>
        ) : messages.length === 0 ? (
          <li className="text-center text-nord7 italic">No messages yet</li>
        ) : (
          messages.map((message) => (
            <li
              key={message.id}
              className={`p-3 rounded-lg shadow-md max-w-fit break-words ${
                message.senderId === receiverId
                  ? "self-start bg-nord9 text-white"
                  : "self-end bg-nord5 text-black"
              }`}
            >
              <p>{message.content}</p>
            </li>
          ))
        )}
      </ul>

      <form
        onSubmit={handleFormSubmit}
        role="form"
        className="p-4 bg-nord5 flex items-center justify-center space-x-2 border-t sticky bottom-0 border-nord3"
      >
        <label>
          Message:
          <textarea
            name="content"
            value={content}
            minLength={2}
            maxLength={300}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Type your message..."
            className="flex-1 p-2 bg-nord6 text-nord0 rounded-lg  resize-none"
          ></textarea>
        </label>
        {responseOnSubmit && <p className="text-nord14">{responseOnSubmit}</p>}
        <button
          type="submit"
          className="p-2 bg-nord7 text-nord6 font-semibold rounded-lg shadow-md hover:bg-nord8 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatPage;

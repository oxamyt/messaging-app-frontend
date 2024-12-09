import { useState } from "react";
import { Message } from "../../types/types";
import { handleSubmit } from "../../utils/handlers";

function ChatPage({ messages }: { messages: Message[] }) {
  const [content, setContent] = useState("");

  return (
    <div>
      <ul>
        {" "}
        {messages.length === 0 ? (
          <li>No messages yet</li>
        ) : (
          messages.map((message) => (
            <li key={message.id}>
              <p>{message.content}</p>
            </li>
          ))
        )}
      </ul>
      <form onSubmit={handleSubmit} role="form">
        <label>
          Message:
          <textarea
            name="content"
            value={content}
            minLength={2}
            maxLength={16}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;

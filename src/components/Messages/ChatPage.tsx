import { useState } from "react";
import { Message } from "../../types/types";

function ChatPage({
  onSubmit,
  messages,
}: {
  onSubmit: (event: React.FormEvent) => void;
  messages: Message[];
}) {
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
      <form onSubmit={onSubmit}>
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

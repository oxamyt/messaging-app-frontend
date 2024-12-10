import { useState } from "react";
import ChatPage from "./ChatPage";
import Sidebar from "./Sidebar";
import { Message } from "../../types/types";

function MessagePage() {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div>
      <Sidebar setMessages={setMessages} />

      <ChatPage messages={messages} />
    </div>
  );
}

export default MessagePage;

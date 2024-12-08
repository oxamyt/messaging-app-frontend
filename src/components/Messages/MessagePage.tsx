import React, { useState } from "react";
import ChatPage from "./ChatPage";
import Sidebar from "./Sidebar";
import { User, Message } from "../../types/types";

interface MessagePageProps {
  fetchUsers: () => Promise<User[]>;
  fetchMessages: (userId: number) => Promise<Message[]>;
  onSubmit: (event: React.FormEvent) => void;
}

function MessagePage({
  fetchUsers,
  fetchMessages,
  onSubmit,
}: MessagePageProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div>
      <Sidebar
        fetchUsers={fetchUsers}
        setMessages={setMessages}
        fetchMessages={fetchMessages}
      />

      <ChatPage onSubmit={onSubmit} messages={messages} />
    </div>
  );
}

export default MessagePage;

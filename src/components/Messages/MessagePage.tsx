import { useState } from "react";
import ChatPage from "./ChatPage";
import Sidebar from "./Sidebar";
import { Message } from "../../types/types";
import Header from "../common/Header";
import Footer from "../common/Footer";

function MessagePage() {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="h-screen flex flex-col bg-nord6 text-nord0">
      <Header />
      <div className="flex-1 relative">
        <Sidebar setMessages={setMessages} />
        <ChatPage messages={messages} />
      </div>
      <Footer />
    </div>
  );
}

export default MessagePage;

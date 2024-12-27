import { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import Sidebar from "./Sidebar";
import { Message } from "../../types/types";
import Header from "../common/Header";
import { useParams } from "react-router-dom";
import { postRequest } from "../../utils/api";
import NavBar from "../common/NavBar";

function MessagePage() {
  const { receiverId } = useParams<{ receiverId?: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverIdState, setReceiverIdState] = useState<number | null>(null);

  useEffect(() => {
    const fetchMessages = async (receiverId: string | undefined) => {
      if (!receiverId) return;

      try {
        const response = await postRequest("message/retrieve", {
          targetId: receiverId,
        });
        setMessages(response.messages);

        setReceiverIdState(parseInt(receiverId, 10));
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages(receiverId);
  }, [receiverId]);

  return (
    <div className="h-screen flex relative flex-col bg-nord6 text-nord0">
      <Header />
      <div className="flex-1 relative">
        <Sidebar />
        {receiverIdState ? (
          <ChatPage messages={messages} receiverId={receiverIdState} />
        ) : (
          <div className="flex items-center justify-center h-full text-nord7 italic">
            Select a user to start messaging.
          </div>
        )}
      </div>
      <NavBar />
    </div>
  );
}

export default MessagePage;

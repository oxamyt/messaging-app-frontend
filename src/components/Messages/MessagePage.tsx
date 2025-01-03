import { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import Sidebar from "./Sidebar";
import { Message } from "../../types/types";
import Header from "../common/Header";
import { useParams } from "react-router-dom";
import { getRequest, postRequest } from "../../utils/api";
import NavBar from "../common/NavBar";

function MessagePage() {
  const { receiverId, groupId } = useParams<{
    receiverId?: string;
    groupId?: string;
  }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverIdState, setReceiverIdState] = useState<number | undefined>(
    undefined
  );
  const [isGroupChat, setIsGroupChat] = useState(false);

  const fetchMessages = async () => {
    try {
      if (receiverId) {
        const response = await postRequest("message/retrieve", {
          targetId: receiverId,
        });

        setMessages(response.messages);

        setReceiverIdState(parseInt(receiverId, 10));
        setIsGroupChat(false);
      } else if (groupId) {
        const response = await getRequest(`message/${groupId}`);

        setMessages(response.messages);

        setIsGroupChat(true);
        setReceiverIdState(undefined);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [receiverId, groupId]);

  return (
    <div className="h-screen flex relative flex-col bg-nord6 text-nord0">
      <Header />
      <div className="flex-1 relative">
        <Sidebar />
        {groupId || receiverId ? (
          <ChatPage
            messages={messages}
            receiverId={receiverIdState}
            groupId={groupId}
            isGroupChat={isGroupChat}
            refreshMessages={fetchMessages}
          />
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

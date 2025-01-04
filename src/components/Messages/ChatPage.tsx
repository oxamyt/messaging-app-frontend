import { useState } from "react";
import { Message } from "../../types/types";
import { handleSubmit } from "../../utils/handlers";
import MessageForm from "../common/MessageForm";
import { postRequest } from "../../utils/api";
import Messages from "../common/Messages";
import ImageForm from "../common/imageForm";

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
      <Messages messages={messages} parsedUserId={parsedUserId} />

      {imageForm && (
        <ImageForm
          setImageForm={setImageForm}
          handleImageFormSubmit={handleImageFormSubmit}
        />
      )}
      <MessageForm
        content={content}
        setContent={setContent}
        handleFormSubmit={handleFormSubmit}
        setImageForm={setImageForm}
        imageForm={imageForm}
      />
    </div>
  );
}

export default ChatPage;

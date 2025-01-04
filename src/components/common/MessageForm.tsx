import { FaRegFileImage } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

interface MessageFormProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleFormSubmit: (e: React.FormEvent) => void;
  setImageForm: React.Dispatch<React.SetStateAction<boolean>>;
  imageForm: boolean;
}

function MessageForm({
  handleFormSubmit,
  content,
  setContent,
  setImageForm,
  imageForm,
}: MessageFormProps) {
  return (
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
  );
}

export default MessageForm;

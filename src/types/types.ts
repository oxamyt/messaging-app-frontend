export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  sender: {
    username: string;
    avatarUrl: string;
    id: number;
  };
  receiver: {
    username: string;
    avatarUrl: string;
    id: number;
  };
}

export interface User {
  id: number;
  username: string;
  avatarUrl: string;
  bio?: string;
}

export interface InputFieldProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: string;
  name: string;
  minLength?: number;
  maxLength?: number;
}

export interface GroupChat {
  id: number;
  name: string;
  members: User[];
  avatarUrl: string;
  messages: Message[];
  creator: User;
  createdAt: Date;
  updatedAt: Date;
}

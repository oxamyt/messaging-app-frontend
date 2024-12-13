export interface Message {
  id: number;
  content: string;
}

export interface User {
  id: number;
  username: string;
  avatarUrl: string;
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

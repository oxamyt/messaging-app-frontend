import { User, Message } from "../types/types";

export async function fetchUsers(): Promise<User[]> {
  console.log("User fetched");
  return [];
}

export async function fetchMessages({
  userId,
}: {
  userId: number;
}): Promise<Message[]> {
  console.log("Messages fetched", userId);
  return [];
}

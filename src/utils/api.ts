import { User, Message } from "../types/types";
const API_URL = import.meta.env.VITE_API_URL;

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

export async function postRequest(
  endpoint: string,
  userData: Record<string, string>
) {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

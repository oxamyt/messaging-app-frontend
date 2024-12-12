import { postRequest } from "./api";

export const handleSubmit = async (
  event: React.FormEvent,
  endpoint: string,
  userData: Record<string, string>
): Promise<void> => {
  event.preventDefault();

  try {
    await postRequest(endpoint, userData);
  } catch (error) {
    console.error("Error during submission:", error);
  }
};

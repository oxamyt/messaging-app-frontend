import { postRequest } from "./api";

export const handleSubmit = async (
  event: React.FormEvent,
  endpoint: string,
  userData: Record<string, string>
) => {
  event.preventDefault();

  try {
    const responseData = await postRequest(endpoint, userData);
    if (responseData.token) {
      return { token: responseData.token, userId: responseData.userId };
    } else if (responseData.message) {
      return { message: responseData.message };
    }
  } catch (error) {
    console.error("Error during submission:", error);
    return { message: "An error occurred. Please try again." };
  }
};

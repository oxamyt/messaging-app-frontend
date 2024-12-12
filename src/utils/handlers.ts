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
      return { token: responseData.token };
    } else {
      return { message: responseData.message || "Success" };
    }
  } catch (error) {
    console.error("Error during submission:", error);
  }
};

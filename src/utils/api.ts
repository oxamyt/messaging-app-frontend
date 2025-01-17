import { User } from "../types/types";
const API_URL = import.meta.env.VITE_API_URL;

export async function fetchUsers(
  endpoint: string
): Promise<User[] | undefined> {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function postRequest(
  endpoint: string,
  userData: Record<string, string> | FormData
) {
  try {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {};

    const body =
      userData instanceof FormData ? userData : JSON.stringify(userData);

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (!(userData instanceof FormData)) {
      headers["Content-Type"] = `application/json`;
    }

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      return errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getRequest(endpoint: string) {
  try {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "GET",
      headers,
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

export async function putRequest(
  endpoint: string,
  userData: Record<string, string>
) {
  try {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "PUT",
      headers,
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

export async function patchRequest(endpoint: string, formData: FormData) {
  try {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "PATCH",
      headers,
      body: formData,
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

export async function deleteRequest(endpoint: string) {
  try {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "DELETE",
      headers,
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

import { useState } from "react";
import { handleSubmit } from "../../utils/handlers";
import InputField from "../common/InputField";

function LoginPage() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginRequest = await handleSubmit(e, "auth/login", userCredentials);

    if (loginRequest && loginRequest.message) {
      setError(loginRequest.message);
    } else {
      if (loginRequest && loginRequest.token) {
        localStorage.setItem("token", loginRequest.token);
        localStorage.setItem("id", loginRequest.userId);

        setError("");
      } else {
        setError("Login failed: No token received.");
      }
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      role="form"
      className="w-full max-w-md bg-nord4 p-6 rounded-lg shadow-lg space-y-4"
    >
      <InputField
        type="text"
        name="username"
        value={userCredentials.username}
        handleChange={handleChange}
        label="Username"
        minLength={2}
        maxLength={16}
      />

      <InputField
        type="password"
        name="password"
        value={userCredentials.password}
        handleChange={handleChange}
        label="Password"
        minLength={4}
      />

      {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        className="w-full py-3 mt-4 bg-nord8 text-nord3 font-bold rounded-md"
      >
        Login
      </button>
    </form>
  );
}

export default LoginPage;

import { useState } from "react";
import { handleSubmit } from "../../utils/handlers";

function LoginPage() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

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
    if (loginRequest && loginRequest.token) {
      localStorage.setItem("token", loginRequest.token);
      console.log("Success:", loginRequest);
    } else {
      console.error("Login failed: No token received.");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full max-w-md bg-nord4 p-6 rounded-lg shadow-lg space-y-4"
    >
      <div>
        <label htmlFor="username" className="block text-nord3">
          Username:
        </label>
        <input
          type="text"
          name="username"
          id="username"
          value={userCredentials.username}
          onChange={handleChange}
          minLength={2}
          maxLength={16}
          required
          className="w-full p-3 mt-2 rounded-md bg-nord2 text-nord6"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-nord3">
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={userCredentials.password}
          onChange={handleChange}
          minLength={2}
          required
          className="w-full p-3 mt-2 rounded-md bg-nord2 text-nord6"
        />
      </div>

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

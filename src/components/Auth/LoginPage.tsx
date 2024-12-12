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
    <form onSubmit={handleFormSubmit} role="form">
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={userCredentials.username}
          onChange={handleChange}
          minLength={2}
          maxLength={16}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={userCredentials.password}
          minLength={2}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;

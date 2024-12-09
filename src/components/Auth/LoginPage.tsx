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

  return (
    <form onSubmit={handleSubmit} role="form">
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

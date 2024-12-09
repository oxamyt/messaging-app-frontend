import { useState } from "react";
import { handleSubmit } from "../../utils/handlers";

function RegisterPage() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userCredentials.password !== userCredentials.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    handleSubmit(e);
  };

  return (
    <form onSubmit={handleFormSubmit}>
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
      <label>
        Confirm password:
        <input
          type="password"
          name="confirmPassword"
          value={userCredentials.confirmPassword}
          minLength={2}
          onChange={handleChange}
          required
        />
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;

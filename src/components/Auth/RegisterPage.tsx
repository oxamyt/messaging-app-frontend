import { useState } from "react";
import { handleSubmit } from "../../utils/handlers";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userCredentials.password !== userCredentials.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    await handleSubmit(e, "auth/register", userCredentials);

    navigate("/auth/login");
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

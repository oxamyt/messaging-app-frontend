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

    const responseData = await handleSubmit(
      e,
      "auth/register",
      userCredentials
    );

    if (responseData && responseData.message) {
      setError(responseData.message);
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="w-full max-w-md bg-nord4 p-6 rounded-lg shadow-lg space-y-4"
    >
      <label className="block text-nord3">
        Username:
        <input
          type="text"
          name="username"
          value={userCredentials.username}
          onChange={handleChange}
          minLength={2}
          maxLength={16}
          required
          className="w-full p-3 mt-2 rounded-md bg-nord2 text-nord6 "
        />
      </label>

      <label className="block text-nord3">
        Password:
        <input
          type="password"
          name="password"
          value={userCredentials.password}
          onChange={handleChange}
          minLength={4}
          required
          className="w-full p-3 mt-2 rounded-md bg-nord2 text-nord6"
        />
      </label>

      <label className="block text-nord3">
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={userCredentials.confirmPassword}
          onChange={handleChange}
          minLength={4}
          required
          className="w-full p-3 mt-2 rounded-md bg-nord2 text-nord6"
        />
      </label>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <button
        type="submit"
        className="w-full py-3 mt-4 bg-nord8 text-nord3 font-bold rounded-md"
      >
        Register
      </button>
    </form>
  );
}

export default RegisterPage;

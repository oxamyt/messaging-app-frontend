import { useState } from "react";
import { handleSubmit } from "../../utils/handlers";
import { useNavigate } from "react-router-dom";
import InputField from "../common/InputField";

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

      <InputField
        type="password"
        name="confirmPassword"
        value={userCredentials.confirmPassword}
        handleChange={handleChange}
        label="Confirm Password"
        minLength={4}
      />

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

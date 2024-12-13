import { render, screen } from "@testing-library/react";
import { expect, describe, it, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import RegisterPage from "../components/Auth/RegisterPage";
import "@testing-library/jest-dom";
import { MemoryRouter as Router } from "react-router-dom";

vi.mock("../utils/handlers.ts", () => ({
  handleSubmit: vi.fn(),
}));

const { handleSubmit } = await import("../utils/handlers");

describe("RegisterPage", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render register form", () => {
    render(
      <Router>
        {" "}
        <RegisterPage />
      </Router>
    );
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("should allow users to type into the username and password fields", async () => {
    const user = userEvent.setup();

    render(
      <Router>
        {" "}
        <RegisterPage />
      </Router>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm password:");

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");

    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });

  it("should not submit the form when fields are empty", async () => {
    const user = userEvent.setup();
    render(
      <Router>
        {" "}
        <RegisterPage />
      </Router>
    );

    const submitButton = screen.getByRole("button", { name: /register/i });

    await user.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("should not submit the form when passwords do not match and display error", async () => {
    const user = userEvent.setup();
    render(
      <Router>
        {" "}
        <RegisterPage />
      </Router>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm password:");

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password");

    const submitButton = screen.getByRole("button", { name: /register/i });

    await user.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password");
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("should submit the form when passwords match", async () => {
    const user = userEvent.setup();
    render(
      <Router>
        {" "}
        <RegisterPage />
      </Router>
    );
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm password:");

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");

    const submitButton = screen.getByRole("button", { name: /register/i });

    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalled();
    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });
});

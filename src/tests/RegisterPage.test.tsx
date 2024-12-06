import { render, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import RegisterPage from "../components/Auth/RegisterPage";
import "@testing-library/jest-dom";

describe("RegisterPage", () => {
  const onSubmit = vi.fn();

  it("should render register form", () => {
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });
    render(<RegisterPage onSubmit={onSubmit} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password:")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  it("should allow users to type into the username and password fields", async () => {
    const user = userEvent.setup();
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });
    render(<RegisterPage onSubmit={onSubmit} />);
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
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });
    const user = userEvent.setup();
    render(<RegisterPage onSubmit={onSubmit} />);

    const submitButton = screen.getByRole("button", { name: /register/i });

    await user.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should not submit the form when passwords do not match and display error", async () => {
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });
    const user = userEvent.setup();
    render(<RegisterPage onSubmit={onSubmit} />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm password:");

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password");

    const submitButton = screen.getByRole("button", { name: /register/i });

    await user.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password");
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("should submit the form when passwords match", async () => {
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });
    const user = userEvent.setup();
    render(<RegisterPage onSubmit={onSubmit} />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText("Password:");
    const confirmPasswordInput = screen.getByLabelText("Confirm password:");

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");

    const submitButton = screen.getByRole("button", { name: /register/i });

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalled();
    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
    expect(confirmPasswordInput).toHaveValue("password123");
  });
});

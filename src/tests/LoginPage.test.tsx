import { render, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import LoginPage from "../components/Auth/LoginPage";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("LoginPage", () => {
  const onSubmit = vi.fn();

  it("should render login form", () => {
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });
    render(<LoginPage onSubmit={onSubmit} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should allow users to type into the username and password fields", async () => {
    const user = userEvent.setup();
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });
    render(<LoginPage onSubmit={onSubmit} />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");

    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
  });

  it("should not submit the form when fields are empty", async () => {
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });
    const user = userEvent.setup();
    render(<LoginPage onSubmit={onSubmit} />);

    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should allow submit the form when fields are empty", async () => {
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });
    const user = userEvent.setup();
    render(<LoginPage onSubmit={onSubmit} />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");

    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.click(submitButton);

    expect(onSubmit).toHaveBeenCalled();
    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
  });
});

import { render, screen } from "@testing-library/react";
import { expect, describe, it, vi, afterEach } from "vitest";
import LoginPage from "../components/Auth/LoginPage";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { fireEvent, act } from "@testing-library/react";

vi.mock("../utils/handlers.ts", () => ({
  handleSubmit: vi.fn(),
}));

const { handleSubmit } = await import("../utils/handlers");

describe("LoginPage", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should render login form", () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should allow users to type into the username and password fields", async () => {
    const user = userEvent.setup();

    render(<LoginPage />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");

    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
  });

  it("should not submit the form when fields are empty", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("should allow submit the form when fields are not empty", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);
    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(usernameInput, "sam");
    await user.type(passwordInput, "password123");
    const form = screen.getByRole("form");
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(handleSubmit).toHaveBeenCalled();
    expect(usernameInput).toHaveValue("sam");
    expect(passwordInput).toHaveValue("password123");
  });
});

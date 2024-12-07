import { render, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatPage from "../components/Messages/ChatPage";

const messages = [
  { id: 1, content: "Hi there!" },
  { id: 2, content: "Hello!" },
];

describe("ChatPage", () => {
  const onSubmit = vi.fn();

  it("renders ChatPage with message list, input, and send button", async () => {
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });
    render(<ChatPage onSubmit={onSubmit} messages={[]} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("should not allow sending a message to user with empty input field", async () => {
    const user = userEvent.setup();
    render(<ChatPage onSubmit={onSubmit} messages={[]} />);

    const submitButton = screen.getByRole("button", { name: /send/i });

    await user.click(submitButton);

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("sends a message to user", async () => {
    onSubmit.mockImplementation((event) => {
      event.preventDefault();
    });
    const user = userEvent.setup();
    render(<ChatPage onSubmit={onSubmit} messages={[]} />);

    const messageInput = screen.getByLabelText(/message/i);

    await user.type(messageInput, "Hi, dude!");
    const submitButton = screen.getByRole("button", { name: /send/i });

    await user.click(submitButton);

    expect(messageInput).toHaveValue("Hi, dude!");
    expect(onSubmit).toHaveBeenCalled();
  });

  it("renders messages passed as props", () => {
    render(<ChatPage onSubmit={onSubmit} messages={messages} />);

    messages.forEach((message) => {
      expect(screen.getByText(message.content)).toBeInTheDocument();
    });
  });

  it("renders a placeholder when there are no messages", () => {
    render(<ChatPage onSubmit={onSubmit} messages={[]} />);

    expect(screen.getByText("No messages yet")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { expect, describe, it, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatPage from "../components/Messages/ChatPage";
import { fireEvent } from "@testing-library/react";
import { Message } from "../types/types";
import { MemoryRouter as Router } from "react-router-dom";

vi.mock("../utils/handlers.ts", () => ({
  handleSubmit: vi.fn(),
}));

const { handleSubmit } = await import("../utils/handlers");
const messages: Message[] = [
  {
    id: 1,
    content: "Hello",
    senderId: 1,
    receiverId: 2,
    sender: {
      username: "user1",
      avatarUrl: "https://example.com/avatar1.png",
      id: 1,
    },
    receiver: {
      username: "user2",
      avatarUrl: "https://example.com/avatar2.png",
      id: 2,
    },
  },
  {
    id: 2,
    content: "Hi there!",
    senderId: 2,
    receiverId: 1,
    sender: {
      username: "User2",
      avatarUrl: "https://example.com/avatar2.png",
      id: 2,
    },
    receiver: {
      username: "User1",
      avatarUrl: "https://example.com/avatar1.png",
      id: 1,
    },
  },
];

describe("ChatPage", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders ChatPage with message list, input, and send button", async () => {
    render(
      <Router>
        <ChatPage messages={messages} receiverId={1} />
      </Router>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("should not allow sending a message to user with empty input field", async () => {
    const user = userEvent.setup();
    render(
      <Router>
        <ChatPage messages={messages} receiverId={1} />
      </Router>
    );

    const submitButton = screen.getByRole("button", { name: /send/i });

    await user.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("sends a message to user", async () => {
    const user = userEvent.setup();
    render(
      <Router>
        <ChatPage messages={messages} receiverId={1} />
      </Router>
    );

    const messageInput = screen.getByLabelText(/message/i);

    await user.type(messageInput, "Hi, dude!");
    const form = screen.getByRole("form");

    fireEvent.submit(form);

    expect(messageInput).toHaveValue("Hi, dude!");
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("renders messages passed as props", () => {
    render(
      <Router>
        <ChatPage messages={messages} receiverId={1} />
      </Router>
    );

    messages.forEach((message) => {
      expect(screen.getByText(message.content)).toBeInTheDocument();
    });
  });

  it("renders a placeholder when there are no messages", () => {
    render(
      <Router>
        <ChatPage messages={[]} receiverId={1} />
      </Router>
    );

    expect(screen.getByText("No messages yet")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { expect, describe, it, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatPage from "../components/Messages/ChatPage";
import { fireEvent } from "@testing-library/react";

vi.mock("../utils/handlers.ts", () => ({
  handleSubmit: vi.fn(),
}));

const { handleSubmit } = await import("../utils/handlers");

const messages = [
  { id: 1, content: "Hi there!" },
  { id: 2, content: "Hello!" },
];

describe("ChatPage", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders ChatPage with message list, input, and send button", async () => {
    render(<ChatPage messages={[]} receiverId={1} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("should not allow sending a message to user with empty input field", async () => {
    const user = userEvent.setup();
    render(<ChatPage messages={[]} receiverId={1} />);

    const submitButton = screen.getByRole("button", { name: /send/i });

    await user.click(submitButton);

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it("sends a message to user", async () => {
    const user = userEvent.setup();
    render(<ChatPage messages={[]} receiverId={1} />);

    const messageInput = screen.getByLabelText(/message/i);

    await user.type(messageInput, "Hi, dude!");
    const form = screen.getByRole("form");

    fireEvent.submit(form);

    expect(messageInput).toHaveValue("Hi, dude!");
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("renders messages passed as props", () => {
    render(<ChatPage messages={messages} receiverId={1} />);

    messages.forEach((message) => {
      expect(screen.getByText(message.content)).toBeInTheDocument();
    });
  });

  it("renders a placeholder when there are no messages", () => {
    render(<ChatPage messages={[]} receiverId={1} />);

    expect(screen.getByText("No messages yet")).toBeInTheDocument();
  });
});

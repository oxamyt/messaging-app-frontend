import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom";
import MessagePage from "../components/Messages/MessagePage";
import { fetchMessages, fetchUsers } from "../utils/api";
import { MemoryRouter as Router } from "react-router-dom";

vi.mock("../utils/api", () => ({
  fetchMessages: vi.fn(),
  fetchUsers: vi.fn(),
  handleSubmit: vi.fn(),
}));

describe("MessagePage", () => {
  it("renders Sidebar with users and displays messages in ChatPage when a user is clicked", async () => {
    const mockUsers = [
      { id: 1, username: "user1", avatarUrl: "example.com/avatar1.png" },
      { id: 2, username: "user2", avatarUrl: "example.com/avatar2.png" },
    ];
    const mockMessages = [
      { id: 1, content: "Hello!", userId: 1 },
      { id: 2, content: "How are you?", userId: 1 },
    ];

    vi.mocked(fetchMessages).mockResolvedValue(mockMessages);
    vi.mocked(fetchUsers).mockResolvedValue(mockUsers);

    render(
      <Router>
        {" "}
        <MessagePage />
      </Router>
    );

    await waitFor(() => {
      mockUsers.forEach((user) => {
        expect(screen.getByText(user.username)).toBeInTheDocument();
      });
    });

    const userElement = screen.getByText(mockUsers[0].username);
    userEvent.click(userElement);

    await waitFor(() => {
      expect(fetchMessages).toHaveBeenCalledWith({ userId: mockUsers[0].id });
    });

    await waitFor(() => {
      mockMessages.forEach((message) => {
        expect(screen.getByText(message.content)).toBeInTheDocument();
      });
    });
  });
});

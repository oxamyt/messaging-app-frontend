import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom";
import MessagePage from "../components/Messages/MessagePage";
import { postRequest, fetchUsers } from "../utils/api";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
vi.mock("../utils/api", () => ({
  postRequest: vi.fn(),
  fetchUsers: vi.fn(),
}));

describe("MessagePage", () => {
  it("renders Sidebar with users and displays messages in ChatPage when a user is clicked", async () => {
    const mockUsers = [
      { id: 1, username: "user1", avatarUrl: "example.com/avatar1.png" },
      { id: 2, username: "user2", avatarUrl: "example.com/avatar2.png" },
    ];
    const mockMessages = [
      {
        id: 1,
        content: "Hello",
        senderId: 1,
        receiverId: 2,
        sender: {
          username: "user1",
          avatarUrl: "https://example.com/avatar1.png",
        },
        receiver: {
          username: "user2",
          avatarUrl: "https://example.com/avatar2.png",
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
        },
        receiver: {
          username: "User1",
          avatarUrl: "https://example.com/avatar1.png",
        },
      },
    ];

    const mockResponse = {
      messages: mockMessages,
    };

    vi.mocked(postRequest).mockResolvedValue(mockResponse);
    vi.mocked(fetchUsers).mockResolvedValue(mockUsers);

    render(
      <Router initialEntries={["/messages/1"]}>
        <Routes>
          <Route path="/messages/:receiverId" element={<MessagePage />} />
        </Routes>
      </Router>
    );

    await waitFor(() => {
      mockUsers.forEach((user) => {
        expect(
          screen.getByRole("listitem", { name: `User ${user.username}` })
        ).toBeInTheDocument();
      });
    });

    const userElement = screen.getByRole("listitem", {
      name: `User ${mockUsers[0].username}`,
    });
    userEvent.click(userElement);

    await waitFor(() => {
      mockMessages.forEach((message) => {
        expect(screen.getByText(message.content)).toBeInTheDocument();
      });
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom";
import MessagePage from "../components/Messages/MessagePage";
import { postRequest, fetchUsers } from "../utils/api";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "../Context/UserContext";
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
      { id: 1, content: "Hello!", userId: 1 },
      { id: 2, content: "How are you?", userId: 1 },
    ];

    const mockResponse = {
      messages: mockMessages,
    };

    vi.mocked(postRequest).mockResolvedValue(mockResponse);
    vi.mocked(fetchUsers).mockResolvedValue(mockUsers);

    render(
      <UserProvider>
        <Router initialEntries={["/messages/1"]}>
          <Routes>
            <Route path="/messages/:receiverId" element={<MessagePage />} />
          </Routes>
        </Router>
      </UserProvider>
    );

    await waitFor(() => {
      mockUsers.forEach((user) => {
        expect(screen.getByText(user.username)).toBeInTheDocument();
      });
    });

    const userElement = screen.getByText(mockUsers[0].username);
    userEvent.click(userElement);

    await waitFor(() => {
      mockMessages.forEach((message) => {
        expect(screen.getByText(message.content)).toBeInTheDocument();
      });
    });
  });
});

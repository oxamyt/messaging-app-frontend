import { render, screen, waitFor } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom";
import Sidebar from "../components/Messages/Sidebar";

describe("Sidebar", () => {
  const mockUsers = [
    { id: 1, username: "user1", avatarUrl: "example.com" },
    { id: 2, username: "user2", avatarUrl: "example.com" },
    { id: 3, username: "user3", avatarUrl: "example.com" },
  ];

  const fetchUsers = vi.fn().mockResolvedValue(mockUsers);
  const fetchMessages = vi.fn();
  const setMessages = vi.fn();

  it("calls fetchUsers on mount", async () => {
    render(
      <Sidebar
        fetchUsers={fetchUsers}
        fetchMessages={fetchMessages}
        setMessages={setMessages}
      />
    );
    await waitFor(() => expect(fetchUsers).toHaveBeenCalledTimes(1));
  });

  it("displays loading message while fetching users", async () => {
    render(
      <Sidebar
        fetchUsers={fetchUsers}
        fetchMessages={fetchMessages}
        setMessages={setMessages}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("user1")).toBeInTheDocument());
  });

  it("renders Sidebar with users list", async () => {
    render(
      <Sidebar
        fetchUsers={fetchUsers}
        fetchMessages={fetchMessages}
        setMessages={setMessages}
      />
    );

    await waitFor(() => {
      mockUsers.forEach((user) => {
        expect(screen.getByText(user.username)).toBeInTheDocument();
      });
    });
  });
});

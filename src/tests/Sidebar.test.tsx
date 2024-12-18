import { render, screen, waitFor } from "@testing-library/react";
import { expect, describe, it, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import Sidebar from "../components/Messages/Sidebar";
import { postRequest, fetchUsers } from "../utils/api";
import { User } from "../types/types";
import { MemoryRouter as Router } from "react-router-dom";

vi.mock("../utils/api", () => ({
  fetchUsers: vi.fn(),
  postRequest: vi.fn(),
}));

describe("Sidebar", () => {
  const mockUsers: User[] = [
    { id: 1, username: "user1", avatarUrl: "example.com" },
    { id: 2, username: "user2", avatarUrl: "example.com" },
    { id: 3, username: "user3", avatarUrl: "example.com" },
  ];

  beforeEach(() => {
    vi.mocked(postRequest).mockResolvedValue([]);
    vi.mocked(fetchUsers).mockResolvedValue(mockUsers);
  });

  it("calls fetchUsers on mount", async () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );
    await waitFor(() => expect(fetchUsers).toHaveBeenCalledTimes(1));
  });

  it("displays loading message while fetching users", async () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("user1")).toBeInTheDocument());
  });

  it("renders Sidebar with users list", async () => {
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    await waitFor(() => {
      mockUsers.forEach((user) => {
        expect(screen.getByText(user.username)).toBeInTheDocument();
      });
    });
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { getRequest } from "../utils/api";
import ProfilePage from "../components/Profile/ProfilePage";

vi.mock("../utils/api", () => ({
  getRequest: vi.fn(),
}));

describe("Profile Page", () => {
  it("renders Profile Page with username, avatar and bio", async () => {
    const mockUser = {
      id: 1,
      username: "user1",
      avatarUrl: "example.com/avatar1.png",
      bio: "Hi! I'm a new one!",
    };

    vi.mocked(getRequest).mockResolvedValue({ data: mockUser });

    render(
      <Router initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:userId" element={<ProfilePage />} />
        </Routes>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(mockUser.username)).toBeInTheDocument();
      expect(screen.getByText(mockUser.bio)).toBeInTheDocument();
      expect(
        screen.findByRole("img", {
          name: /user1/i,
        })
      );
    });
  });
});

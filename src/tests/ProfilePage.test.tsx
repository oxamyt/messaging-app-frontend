import { render, screen, waitFor } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { getRequest, putRequest } from "../utils/api";
import ProfilePage from "../components/Profile/ProfilePage";
import userEvent from "@testing-library/user-event";

vi.mock("../utils/api", () => ({
  getRequest: vi.fn(),
  putRequest: vi.fn(),
}));

describe("Profile Page", () => {
  it("renders Profile Page with username, avatar and bio", async () => {
    const mockUser = {
      id: 1,
      username: "user1",
      avatarUrl: "example.com/avatar1.png",
      bio: "Hi! I'm a new one!",
    };

    vi.mocked(getRequest).mockResolvedValue({ user: mockUser });

    render(
      <Router initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:id" element={<ProfilePage />} />
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

  it("allow editing profile after selecting edit mode", async () => {
    const mockUser = {
      id: 1,
      username: "user1",
      avatarUrl: "example.com/avatar1.png",
      bio: "Hi! I'm a new one!",
    };

    const user = userEvent.setup();

    vi.mocked(getRequest).mockResolvedValue({ user: mockUser });

    render(
      <Router initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:id" element={<ProfilePage />} />
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

    const editButton = screen.getByRole("button", { name: /editMode/i });
    await user.click(editButton);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  it("should allow typing new info profile after selecting edit mode", async () => {
    const mockUser = {
      id: 1,
      username: "user1",
      avatarUrl: "example.com/avatar1.png",
      bio: "Hi! I'm a new one!",
    };

    const user = userEvent.setup();

    vi.mocked(getRequest).mockResolvedValue({ user: mockUser });

    render(
      <Router initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:id" element={<ProfilePage />} />
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

    const editButton = screen.getByRole("button", { name: /editMode/i });
    await user.click(editButton);

    const usernameEditInput = screen.getByLabelText(/username/i);
    const bioEditInput = screen.getByLabelText(/bio/i);

    await user.clear(usernameEditInput);
    await user.clear(bioEditInput);

    await user.type(usernameEditInput, "sam");
    await user.type(bioEditInput, "New bio");

    await waitFor(() => {
      expect(usernameEditInput).toHaveValue("sam");
      expect(bioEditInput).toHaveValue("New bio");
    });
  });

  it("should allow submitting new info to profile after typing new info", async () => {
    const mockUser = {
      id: 1,
      username: "user1",
      avatarUrl: "example.com/avatar1.png",
      bio: "Hi! I'm a new one!",
    };

    const user = userEvent.setup();

    vi.mocked(getRequest).mockResolvedValue({ user: mockUser });
    vi.mocked(putRequest).mockResolvedValue({ bio: "New bio" });

    render(
      <Router initialEntries={["/user/1"]}>
        <Routes>
          <Route path="/user/:id" element={<ProfilePage />} />
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

    const editButton = screen.getByRole("button", { name: /editMode/i });
    await user.click(editButton);

    const usernameEditInput = screen.getByLabelText(/username/i);
    const bioEditInput = screen.getByLabelText(/bio/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await user.clear(usernameEditInput);
    await user.clear(bioEditInput);

    await user.type(usernameEditInput, "sam");
    await user.type(bioEditInput, "New bio");

    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("sam")).toBeInTheDocument();
      expect(screen.getByText("New bio")).toBeInTheDocument();
      expect(
        screen.findByRole("img", {
          name: /user1/i,
        })
      );
    });
  });
});

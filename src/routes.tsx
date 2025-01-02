import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./components/Auth/LoginPage";
import AuthLayout from "./components/Auth/AuthLayout";
import RegisterPage from "./components/Auth/RegisterPage";
import MessagePage from "./components/Messages/MessagePage";
import ProfileLayout from "./components/Profile/ProfileLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/messages/:receiverId?",
    element: <MessagePage />,
  },
  {
    path: "/group/:groupId?",
    element: <MessagePage />,
  },
  {
    path: "/user/:id?",
    element: <ProfileLayout />,
  },
]);

export default router;

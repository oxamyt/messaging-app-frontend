import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import "./index.css";
import { UserProvider } from "./Context/UserContext.js";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);

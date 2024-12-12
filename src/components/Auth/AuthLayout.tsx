import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div>
      <header>
        <h1>Messaging App</h1>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <h1>Messaging App</h1>
      </footer>
    </div>
  );
}

export default AuthLayout;

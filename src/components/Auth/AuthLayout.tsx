import { Outlet } from "react-router-dom";
import Header from "../common/Header";

function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-nord6 text-nord0">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;

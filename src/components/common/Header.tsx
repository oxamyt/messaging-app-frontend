import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-nord6 sticky top-0 z-50 text-nord0 p-4 flex justify-between items-center">
      <nav className="space-x-4">
        <Link to="/auth/register" className="text-nord2 font-bold ">
          Register
        </Link>
        <Link to="/auth/login" className="text-nord2 font-bold ">
          Login
        </Link>
        <Link to="/messages" className="text-nord2 font-bold ">
          Messages
        </Link>
      </nav>
    </header>
  );
}

export default Header;

import { Link } from "react-router-dom";
import { isTokenValid } from "../../utils/isTokenValid";
import { FiMessageSquare } from "react-icons/fi";
import { IoIosLogIn } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

function Header() {
  const userId = localStorage.getItem("id") || null;
  const token = localStorage.getItem("token");

  const isLoggedIn = userId && token && isTokenValid(token);

  if (!isLoggedIn) {
    localStorage.removeItem("id");
    localStorage.removeItem("jwt");
  }

  return (
    <header className="bg-nord6 sticky top-0 z-50 text-nord0 p-4 hidden lg:flex justify-center w-full items-center  ">
      <nav className="space-x-4 w-full flex justify-around">
        <Link to="/auth/login" className="text-nord2 font-bold">
          <IoIosLogIn className="text-nord2" size={30} />
        </Link>
        <Link to="/messages" className="text-nord2 font-bold">
          <FiMessageSquare className="text-nord2" size={30} />
        </Link>
        <Link to="/">
          <FaHome className="text-nord2" size={30} />
        </Link>
        {isLoggedIn && (
          <Link to={`/user/${userId}`}>
            <CgProfile className="text-nord2" size={30} />
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;

import { FiMessageSquare } from "react-icons/fi";
import { IoIosLogIn } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { isTokenValid } from "../../utils/isTokenValid";

function NavBar() {
  const userId = localStorage.getItem("id") || null;
  const token = localStorage.getItem("token");

  const isLoggedIn = userId && token && isTokenValid(token);

  if (!isLoggedIn) {
    localStorage.removeItem("id");
    localStorage.removeItem("jwt");
  }

  return (
    <nav className="bg-nord5 border-t border-nord3 text-nord0 p-4 w-full flex justify-between items-center lg:hidden z-50">
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
  );
}

export default NavBar;

import { Link } from "react-router-dom";
import { FaUserPlus, FaSignInAlt, FaComment } from "react-icons/fa";
import Header from "./components/common/Header";
import NavBar from "./components/common/NavBar";

const userId = localStorage.getItem("id") || null;

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-between bg-nord6 text-nord0">
      <Header />
      <main className="space-y-4 h-full flex flex-col justify-center items-center">
        <Link
          to="/auth/register"
          className=" px-6 py-3 bg-nord8 text-nord6 rounded-lg hover:bg-nord7 text-center flex items-center justify-center space-x-2"
        >
          <FaUserPlus />
          <span>Register</span>
        </Link>
        <Link
          to="/auth/login"
          className=" px-6 py-3 bg-nord7 text-nord6 rounded-lg hover:bg-nord8 text-center flex items-center justify-center space-x-2"
        >
          <FaSignInAlt />
          <span>Login</span>
        </Link>
        {userId && (
          <Link
            to="/messages"
            className=" px-6 py-3 bg-nord7 text-nord6 rounded-lg hover:bg-nord8 text-center flex items-center justify-center space-x-2"
          >
            <FaComment />
            <span>Messages</span>
          </Link>
        )}
      </main>
      <NavBar />
    </div>
  );
}

export default App;

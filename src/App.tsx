import { Link } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-between bg-nord6 text-nord0">
      <Header />
      <div className="space-y-4 mt-8">
        <Link
          to="/auth/register"
          className="block px-6 py-3 bg-nord8 text-nord6 rounded-lg hover:bg-nord7 text-center"
        >
          Register
        </Link>
        <Link
          to="/auth/login"
          className="block px-6 py-3 bg-nord7 text-nord6 rounded-lg hover:bg-nord8 text-center"
        >
          Login
        </Link>
        <Link
          to="/messages"
          className="block px-6 py-3 bg-nord7 text-nord6 rounded-lg hover:bg-nord8 text-center"
        >
          Messages
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default App;

import { Link } from "react-router-dom";

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="space-x-4">
        <Link
          to="/auth/register"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Register
        </Link>
        <Link
          to="/auth/login"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default App;

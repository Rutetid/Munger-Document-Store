import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Munger Document Store
          </Link>
          <div className="flex gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/")
                  ? "text-blue-600 "
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive("/dashboard")
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/request"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Request
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

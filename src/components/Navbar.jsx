import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaTachometerAlt,
  FaPlus,
  FaSearch,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaBell,
  FaShieldAlt,
} from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navigation = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Dashboard", href: "/dashboard", icon: FaTachometerAlt },
  ];

  return (
    <nav className="sticky top-0 z-50 navbar-blur shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-600 rounded-xl shadow-lg logo-glow group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <FaShieldAlt className="text-white text-lg" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                Munger Document Store
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Government of Bihar</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-item group relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                  isActive(item.href)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                <item.icon
                  className={`text-sm transition-transform group-hover:scale-110 ${
                    isActive(item.href) ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/request"
              className="group bg-gradient-to-r from-blue-600 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <FaPlus className="text-sm group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">New Request</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-all duration-300"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/50 mobile-menu-slide">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon
                    className={`text-sm ${
                      isActive(item.href) ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Mobile user section */}
              <div className="pt-4 mt-4 border-t border-gray-200/50">
                <div className="flex items-center gap-3 px-4 py-3 text-gray-600">
                  <FaUserCircle className="text-xl text-gray-400" />
                  <div>
                    <p className="font-medium">Guest User</p>
                    <p className="text-sm text-gray-500">guest@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useEffect, useState, useContext } from "react";
import { User, ShoppingCart, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../App";
const CartBadge = () => {
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        try {
          const items = JSON.parse(cart);
          const count = items.reduce(
            (total, item) => total + (item.quantity || 0),
            0
          );
          setCartCount(count);
        } catch (error) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);
  if (cartCount === 0) return null;
  return (
    <span className="absolute -top-[9px] -right-[9px] bg-red-600 text-white text-xs w-[20px] h-[20px] rounded-full flex items-center justify-center font-bold">
      {cartCount > 99 ? "99+" : cartCount}
    </span>
  );
};
function Header() {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const [showDashboardLink, setShowDashboardLink] = useState(false);
  useEffect(() => {
    const checkRegistration = () => {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const userData = JSON.parse(user);
          if (
            userData.phone === "+998938573311" &&
            userData.password === "123456"
          ) {
            setShowDashboardLink(true);
          } else {
            setShowDashboardLink(false);
          }
        } catch {
          setShowDashboardLink(false);
        }
      } else {
        setShowDashboardLink(false);
      }
    };
    checkRegistration();
    window.addEventListener("storage", checkRegistration);
    window.addEventListener("cartUpdated", checkRegistration);
    return () => {
      window.removeEventListener("storage", checkRegistration);
      window.removeEventListener("cartUpdated", checkRegistration);
    };
  }, []);
  const navItems = [
    { path: "/", label: "Bosh sahifa", activeColor: "bg-blue-500" },
    { path: "/catalog", label: "Katalog", activeColor: "bg-emerald-500" },
    { path: "/about", label: "Haqimizda", activeColor: "bg-amber-500" },
    { path: "/contact", label: "Aloqa", activeColor: "bg-purple-500" },
  ];
  const renderNavLinks = (isMobile = false) => {
    return navItems.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <Link 
          key={item.path}
          to={item.path}
          className={`
            relative flex items-center justify-center transition-all duration-200
            ${
              isMobile
                ? "flex-1 py-3 px-0.5 text-sm"
                : "px-5 py-3 text-base"
            }
            ${
              isActive
                ? "text-white font-medium"
                : isMobile
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-300 hover:text-white"
            }
          `}
        >
          {item.label}
          {isActive && (
            <span
              className={`
                absolute bottom-0 left-1/2 -translate-x-1/2 
                w-4 sm:w-6 h-0.5 rounded-full ${item.activeColor}
              `}
            />
          )}
        </Link>
      );
    });
  };
  if (isLoading) {
    return (
      <header className="bg-[#1e293b] shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="w-12 h-8 bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="bg-[#1e293b] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <img
            src="https://static.tildacdn.com/tild3463-3734-4963-a665-653363316531/Frame_2087327802.png"
            alt="Logo"
            className="h-8 rounded-lg hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <nav className="hidden lg:flex flex-1 justify-center gap-6">
          {renderNavLinks()}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/backet"
            className="text-white hover:text-blue-300 relative"
          >
            <ShoppingCart size={20} />
            <CartBadge />
          </Link>
          {showDashboardLink && (
            <a
              href="http://localhost:5174"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center gap-2 text-sm"
            >
              <Settings size={16} />
              Dashboard
            </a>
          )}
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="text-white hover:text-blue-300"
            >
              <User size={20} />
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
            >
              <User size={16} />
              Kirish
            </Link>
          )}
        </div>
      </div>
      <nav className="lg:hidden bg-[#1e293b] border-t border-gray-700">
        <div className="flex items-center justify-around">
          {renderNavLinks(true)}
        </div>
      </nav>
    </header>
  );
}
export default Header;


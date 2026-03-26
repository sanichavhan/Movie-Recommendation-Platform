import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useState, useEffect } from "react";
import "../../styles/Navbar.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when at the top
      if (currentScrollY < 50) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      // Show navbar when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = async () => {
    try {
      await logout();
      // Refresh the page to clear all UI state and remove user data
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);
      // Still refresh on error to ensure user is logged out
      window.location.href = '/login';
    }
  };

  return (
    <nav className={`navbar ${isVisible ? "navbar-visible" : "navbar-hidden"}`}>
      <h2 className="navbar-brand">🎬 FilmyZone</h2>

      <div className="navbar-center">
        <div className="navbar-nav">
          <Link to="/">Home</Link>
          <Link to="/discover">Discover</Link>
          <Link to="/tv">TV Shows</Link>
          <Link to="/people">People</Link>
          <Link to="/search">Search</Link>
        </div>
      </div>

      <div className="navbar-auth">
        {user ? (
          <>
            <span className="user-info">👤 {user.username || user.email}</span>
            
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </>
        ) : (
          <>
            
            <div className="auth-links">
              <Link to="/login" className="login-link">
                Login
              </Link>
              <Link to="/register" className="register-link">
                Register
              </Link>
            </div>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


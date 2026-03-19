import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Navbar.scss";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-brand">🎬 MovieApp</h2>

      <div className="navbar-nav">
        <Link to="/">Home</Link>
        <Link to="/discover">Discover</Link>
        <Link to="/tv">TV Shows</Link>
        <Link to="/people">People</Link>
        <Link to="/search">Search</Link>
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
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="login-link">
              Login
            </Link>
            <Link to="/register" className="register-link">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


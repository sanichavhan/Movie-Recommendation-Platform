import "../../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">About</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact</a>
      </div>
      <p className="footer-copy">🎬 © 2024-2026 Movie Discovery Platform. All rights reserved.</p>
      <p className="footer-attribution">Powered by TMDB API</p>
    </footer>
  );
};

export default Footer;


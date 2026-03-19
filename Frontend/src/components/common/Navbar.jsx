import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{display:"flex",gap:"20px",padding:"15px",background:"#111",color:"#fff"}}>
      <h2>MovieApp</h2>

      <Link to="/">Home</Link>
      <Link to="/discover">Discover</Link>
      <Link to="/tv">TV Shows</Link>
      <Link to="/people">People</Link>
      <Link to="/search">Search</Link>
    </nav>
  );
};

export default Navbar;
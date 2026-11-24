import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        THE SNAP
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/players">Players</Link>
        <Link to="/teams">Teams</Link>
      </div>
    </nav>
  );
}

export default Navbar;
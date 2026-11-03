function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-logo">
        THE SNAP
      </a>

      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="#players">Players</a>
        <a href="#teams">Teams</a>
        <a href="#standings">Standings</a>
      </div>
    </nav>
  );
}

export default Navbar;
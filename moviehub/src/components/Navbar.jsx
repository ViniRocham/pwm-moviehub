import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>MovieHub</h1>

      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/favorites" style={styles.link}>Favoritos</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    background: "#000",
    borderBottom: "1px solid #222"
  },
  logo: {
    color: "#e50914"
  },
  link: {
    marginLeft: "20px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "500"
  }
};

export default Navbar;
import { Link } from "react-router-dom";

// styles
import "./navigationBar.css";

function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="name">
          <h1>Canvas</h1>
        </Link>
        <Link to="/" className="item">
          Add Node
        </Link>
        <Link to="/" className="item">
          Delete Node
        </Link>
        <Link to="/" className="item">
          Edit Node
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;

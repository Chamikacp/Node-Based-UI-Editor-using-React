import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import AddOrEditModal from "../addOrEditModal/addOrEditModal";

// styles
import "./navigationBar.css";

function Navbar() {
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const onAddClick = useCallback((event) => {
    event.preventDefault();
    setOpenModal(true);
  }, []);

  return (
    <>
      <AddOrEditModal open={openModal} onClose={onCloseModal} />
      <div className="navbar">
        <nav>
          <Link to="/" className="name">
            <h1>Canvas</h1>
          </Link>
          <Link to="/" className="item" onClick={onAddClick}>
            Add Node
          </Link>
          <Link to="/" className="item">
            Edit Node
          </Link>
          <Link to="/" className="item">
            Delete Node
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;

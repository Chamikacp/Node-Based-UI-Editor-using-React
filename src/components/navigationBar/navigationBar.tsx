import { Link } from "react-router-dom";
import { useCallback, useState } from "react";
import AddOrEditModal from "../addOrEditModal/addOrEditModal";
import { useReduxDispatch } from "../../store";
// styles
import "./navigationBar.css";
import { AppActions } from "../../redux/app.slice";

function Navbar() {
  const dispatch = useReduxDispatch();
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const onAddClick = useCallback((event: { preventDefault: () => void }) => {
    event.preventDefault();
    setOpenModal(true);
  }, []);

  const onEditClick = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      dispatch(AppActions.setIsEditModeOn(true));
    },
    [dispatch]
  );

  const onDeleteClick = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      dispatch(AppActions.setIsDeleteModeOn(true));
    },
    [dispatch]
  );

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
          <Link to="/" className="item" onClick={onEditClick}>
            Edit Node
          </Link>
          <Link to="/" className="item" onClick={onDeleteClick}>
            Delete Node
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Navbar;

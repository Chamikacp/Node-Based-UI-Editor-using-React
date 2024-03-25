import { Link } from "react-router-dom";
import { useCallback } from "react";
import AddOrEditModal from "../addOrEditModal/addOrEditModal";
import { useReduxDispatch, useReduxSelector } from "../../store";
import { AppActions } from "../../redux/app.slice";
import { getAddModalStatus } from "../../redux/app.selector";
import i18n from "../../i18n";

// styles
import "./navigationBar.css";

const Navbar: React.FC = () => {
  const dispatch = useReduxDispatch();
  const isAddModalOpen = useReduxSelector(getAddModalStatus);

  const onCloseModal = useCallback(() => {
    dispatch(AppActions.setIsAddModalOpen(false));
    dispatch(AppActions.setIsEditModeOn(false));
  }, [dispatch]);

  const onAddClick = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      dispatch(AppActions.setIsEditModeOn(false));
      dispatch(AppActions.setIsAddLinkModeOn(false));
      dispatch(AppActions.setIsDeleteModeOn(false));
      dispatch(AppActions.setIsAddModalOpen(true));
    },
    [dispatch]
  );

  const onEditClick = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      dispatch(AppActions.setIsAddLinkModeOn(false));
      dispatch(AppActions.setIsDeleteModeOn(false));
      dispatch(AppActions.setIsEditModeOn(true));
      alert(i18n.home.navigationBar.editModeOn);
    },
    [dispatch]
  );

  const onAddLink = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      dispatch(AppActions.setIsDeleteModeOn(false));
      dispatch(AppActions.setIsEditModeOn(false));
      dispatch(AppActions.setIsAddLinkModeOn(true));
      alert(i18n.home.navigationBar.addLinkModeOn);
    },
    [dispatch]
  );

  const onDeleteClick = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      dispatch(AppActions.setIsEditModeOn(false));
      dispatch(AppActions.setIsAddLinkModeOn(false));
      dispatch(AppActions.setIsDeleteModeOn(true));
      alert(i18n.home.navigationBar.deleteModeOn);
    },
    [dispatch]
  );

  return (
    <>
      <AddOrEditModal open={isAddModalOpen} onClose={onCloseModal} />
      <div className="navbar">
        <nav>
          <Link to="/" className="name">
            <h1>{i18n.home.navigationBar.title}</h1>
          </Link>
          <Link to="/" className="item" onClick={onAddClick}>
            {i18n.home.navigationBar.addLink}
          </Link>
          <Link to="/" className="item" onClick={onEditClick}>
            {i18n.home.navigationBar.editNode}
          </Link>
          <Link to="/" className="item" onClick={onAddLink}>
            {i18n.home.navigationBar.addLink}
          </Link>
          <Link to="/" className="item" onClick={onDeleteClick}>
            {i18n.home.navigationBar.deleteNode}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

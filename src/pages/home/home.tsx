import { useEffect } from "react";
import { useReduxDispatch } from "../../store";
import { AppActions } from "../../redux/app.slice";
import GraphView from "../../components/graphView/graphView";
import {
  getLocalStorage,
  setLocalStorage,
} from "../../utils/localStorage.util";

// styles
import "./home.css";

const Home: React.FC = () => {
  const dispatch = useReduxDispatch();

  useEffect(() => {
    const items = getLocalStorage();
    if (items) {
      dispatch(AppActions.setGraph(JSON.parse(items)));
    } else {
      setLocalStorage([]);
    }
  }, [dispatch]);

  return (
    <div className="home">
      <GraphView />
    </div>
  );
};

export default Home;

import { useEffect } from "react";
import { useReduxDispatch } from "../../store";

// styles
import "./home.css";
import { AppActions } from "../../redux/app.slice";

function Home() {
  const dispatch = useReduxDispatch();

  useEffect(() => {
    const items = localStorage.getItem("graph");
    if (items) {
      dispatch(AppActions.setGraph(JSON.parse(items)));
    } else {
      localStorage.setItem("graph", JSON.stringify([]));
    }
  }, [dispatch]);

  return <div className="home"></div>;
}

export default Home;

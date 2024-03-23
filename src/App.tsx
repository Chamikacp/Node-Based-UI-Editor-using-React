import { BrowserRouter, Routes, Route } from "react-router-dom";

// page components
import Navbar from "./components/navigationBar/navigationBar";
import Home from "./pages/home/home";

// styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

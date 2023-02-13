import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import Home from "./components/home/Home.jsx";
import VideogameDetail from "./components/videogameDetail/VideogameDetail.jsx";
import CreateVideogame from "./components/createVideogame/CreateVideogame.jsx";
import axios from "axios";
axios.defaults.baseURL =
  "https://pi-videogames-production-a301.up.railway.app/";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/:id" element={<VideogameDetail />} />
        <Route exact path="/create" element={<CreateVideogame />} />
      </Routes>
    </BrowserRouter>
  );
}

// export default App;

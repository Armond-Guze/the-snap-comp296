import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import PlayerSearch from "./components/PlayerSearch";
import TeamSearch from "./components/TeamSearch";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PlayerSearch />
              <TeamSearch />
            </>
          }
        />
        <Route path="/teams" element={<TeamSearch />} />
        <Route path="/players" element={<PlayerSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

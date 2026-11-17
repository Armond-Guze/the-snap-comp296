import "./App.css";
import Navbar from "./components/Navbar";
import PlayerSearch from "./components/PlayerSearch";
import TeamSearch from "./components/TeamSearch";

function App() {
  return (
    <div>
      <Navbar />
      <PlayerSearch />
      <TeamSearch />
    </div>
  );
}

export default App;

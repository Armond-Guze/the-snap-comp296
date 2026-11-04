import { useState, useEffect } from "react";

function PlayerSearch() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");

useEffect(() => {
    async function getPlayers() {
      try {
        const response = await fetch("/api/players");
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }
     getPlayers();
  }, []);

 return (
    <div className="player-search" id="players">
      <h1>Player Search</h1>
      <input
        type="text"
        placeholder="Search for a player"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <p>Players loaded: {players.length}</p>
    </div>
  );
}

export default PlayerSearch;
import { useState, useEffect } from "react";

function PlayerSearch() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);

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

  useEffect(() => {
    if (!selectedPlayer) return;

    async function getPlayerStats() {
      setPlayerStats(null);

      try {
        const response = await fetch("/api/player-stats");

        if (!response.ok) {
          throw new Error("Failed to retrieve player stats");
        }

        const data = await response.json();

        const stats = data.find(
          (player) => String(player.PlayerID) === String(selectedPlayer.id),
        );

        setPlayerStats(stats || null);
      } catch (error) {
        console.error("Error fetching player stats:", error);
      }
    }

    getPlayerStats();
  }, [selectedPlayer]);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="player-search" id="players">
      <h1>Player Search</h1>
      <input
        type="text"
        placeholder="Search for a player"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {selectedPlayer && (
        <div className="player-details">
          <h2>{selectedPlayer.name}</h2>
          <p>Team: {selectedPlayer.team}</p>
          <p>Position: {selectedPlayer.position}</p>

          {playerStats && (
            <div>
              <h3>2025 Season Statistics</h3>

              {selectedPlayer.position === "QB" && (
                <>
                  <p>Passing Yards: {playerStats.PassingYards ?? "N/A"}</p>
                  <p>
                    Passing Touchdowns: {playerStats.PassingTouchdowns ?? "N/A"}
                  </p>
                  <p>
                    Interceptions: {playerStats.PassingInterceptions ?? "N/A"}
                  </p>
                </>
              )}

              {selectedPlayer.position === "RB" && (
                <>
                  <p>Rushing Yards: {playerStats.RushingYards ?? "N/A"}</p>
                  <p>
                    Rushing Touchdowns: {playerStats.RushingTouchdowns ?? "N/A"}
                  </p>
                  <p>Receptions: {playerStats.Receptions ?? "N/A"}</p>
                </>
              )}

              {(selectedPlayer.position === "WR" ||
                selectedPlayer.position === "TE") && (
                <>
                  <p>Receptions: {playerStats.Receptions ?? "N/A"}</p>
                  <p>Receiving Yards: {playerStats.ReceivingYards ?? "N/A"}</p>
                  <p>
                    Receiving Touchdowns:{" "}
                    {playerStats.ReceivingTouchdowns ?? "N/A"}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {search &&
        filteredPlayers.map((player) => (
          <button key={player.id} onClick={() => setSelectedPlayer(player)}>
            {player.name} - {player.team}
          </button>
        ))}

      <p>Players loaded: {players.length}</p>
    </div>
  );
}

export default PlayerSearch;

import { useState, useEffect } from "react";

function PlayerSearch() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [playerPhoto, setPlayerPhoto] = useState(null);

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

  useEffect(() => {
    if (!selectedPlayer) return;

    let active = true;

    async function getPlayerPhoto() {
      try {
        const response = await fetch(
          `/api/player-headshot?name=${encodeURIComponent(selectedPlayer.name)}&team=${encodeURIComponent(selectedPlayer.team)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch player headshot");
        }

        const data = await response.json();

        if (active) {
          setPlayerPhoto(data.photoUrl || null);
        }
      } catch (error) {
        console.error("Error fetching player headshot:", error);
      }
    }

    getPlayerPhoto();

    return () => {
      active = false;
    };
  }, [selectedPlayer]);

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="player-search" id="players">
      <div className="player-search-header">
        <h1>Player Search</h1>
        <div className="player-search-box">
          <input
            type="text"
            placeholder="Search for a player"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <div className="player-search-results">
              {filteredPlayers.map((player) => (
                <button
                  key={player.id}
                  onClick={() => {
                    setSelectedPlayer(player);
                    setSearch("");
                  }}
                >
                  {player.name} - {player.team}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedPlayer && (
        <div className="player-details">
          <div className="player-profile">
            {playerPhoto ? (
              <img
                className="player-headshot"
                src={playerPhoto}
                alt={selectedPlayer.name}
                onError={() => setPlayerPhoto(null)}
              />
            ) : (
              <div className="player-headshot-placeholder">
                {selectedPlayer.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}

            <div>
              <h2>{selectedPlayer.name}</h2>
              <p>Team: {selectedPlayer.team}</p>
              <p>Position: {selectedPlayer.position}</p>
            </div>
          </div>

          {playerStats && (
            <div className="player-stats">
              <h3>2026 Season Statistics</h3>

              {selectedPlayer.position === "QB" && (
                <>
                  <p>
                    <strong>{playerStats.PassingYards ?? "N/A"}</strong>
                    <span>Passing Yards:</span>
                  </p>
                  <p>
                    <strong>{playerStats.PassingTouchdowns ?? "N/A"}</strong>
                    <span>Passing Touchdowns</span>
                  </p>
                  <p>
                    <strong>{playerStats.PassingInterceptions ?? "N/A"}</strong>
                    <span>Interceptions</span>
                  </p>
                </>
              )}

              {selectedPlayer.position === "RB" && (
                <>
                  <p>
                    <strong>{playerStats.RushingYards ?? "N/A"}</strong>
                    <span>Rushing Yards</span>
                  </p>
                  <p>
                    <strong>{playerStats.RushingTouchdowns ?? "N/A"}</strong>
                    <span>Rushing Touchdowns</span>
                  </p>
                  <p>
                    <strong>{playerStats.Receptions ?? "N/A"}</strong>
                    <span>Receptions</span>
                  </p>{" "}
                </>
              )}

              {(selectedPlayer.position === "WR" ||
                selectedPlayer.position === "TE") && (
                <>
                  <p>
                    <strong>{playerStats.Receptions ?? "N/A"}</strong>
                    <span>Receptions</span>
                  </p>{" "}
                  <p>
                    <strong>{playerStats.ReceivingYards ?? "N/A"}</strong>
                    <span>Receiving Yards</span>
                  </p>
                  <p>
                    <strong>{playerStats.ReceivingTouchdowns ?? "N/A"}</strong>
                    <span>Receiving Touchdowns</span>
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}
      <p>Players loaded: {players.length}</p>
    </div>
  );
}

export default PlayerSearch;

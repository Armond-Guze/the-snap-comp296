import { useState, useEffect } from "react";

function TeamSearch() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamLogo, setTeamLogo] = useState(null);

  useEffect(() => {
    async function getTeams() {
      try {
        const response = await fetch("/api/teams");

        if (!response.ok) {
          throw new Error("Failed to retrieve teams");
        }

        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    }

    getTeams();
  }, []);

  useEffect(() => {
    if (!selectedTeam) return;

    let active = true;

    async function getTeamLogo() {
      try {
        const response = await fetch(
          `/api/team-logo?name=${encodeURIComponent(selectedTeam.name)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to retrieve team logo");
        }

        const data = await response.json();

        if (active) {
          setTeamLogo(data.logoUrl || null);
        }
      } catch (error) {
        console.error("Error fetching team logo:", error);
      }
    }

    getTeamLogo();

    return () => {
      active = false;
    };
  }, [selectedTeam]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase().trim()),
  );

  return (
    <div className="team-search" id="teams">
      <div className="team-search-header">
        <h1>Team Search</h1>

        <div className="team-search-box">
          <input
            type="text"
            placeholder="Search for a team"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search.trim() && (
            <div className="team-search-results">
              {filteredTeams.map((team) => (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => {
                    setSelectedTeam(team);
                    setTeamLogo(null);
                    setSearch("");
                  }}
                >
                  {team.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedTeam && (
        <div className="team-details">
          {teamLogo && (
            <img
              className="team-logo"
              src={teamLogo}
              alt={selectedTeam.name}
              onError={() => setTeamLogo(null)}
            />
          )}
          <div>
            <h2>{selectedTeam.name}</h2>
            <p>Division: {selectedTeam.division}</p>
          </div>
        </div>
      )}
      <p>Teams loaded: {teams.length}</p>
    </div>
  );
}

export default TeamSearch;
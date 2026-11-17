import { useState, useEffect } from "react";

function TeamSearch() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");

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
        </div>
      </div>

      <p>Teams loaded: {teams.length}</p>
    </div>
  );
}

export default TeamSearch;

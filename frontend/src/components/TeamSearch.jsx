import { useState, useEffect } from "react";

function TeamSearch() {
  const [teams, setTeams] = useState([]);

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
      <h1>Team Search</h1>
      <p>Teams loaded: {teams.length}</p>
    </div>
  );
}

export default TeamSearch;
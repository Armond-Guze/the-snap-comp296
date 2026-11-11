const Standings = require("./classes/Standings");
const Team = require("./classes/Team");
const Player = require("./classes/Player");

const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

// start the express server
const startServer = () => {
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ message: "Backend is ALL GOOD!" });
  });
  app.get("/api/standings", async (req, res) => {
    try {
      const response = await fetch(
        "https://api.sportsdata.io/api/nfl/fantasy/json/Standings/2025",
        {
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.SPORTS_DATA_API_KEY,
          },
        },
      );
      if (!response.ok) {
        return res.status(response.status).json({
          error: "Failed to retrieve NFL standings",
        });
      }

      const standingsData = await response.json();

      const standings = standingsData.map((team) => {
        const standing = new Standings(
          team.Name,
          team.Wins,
          team.Losses,
          team.Ties,
          team.ConferenceRank,
        );

        return standing.getStandingsInfo();
      });

      res.json(standings);
    } catch (error) {
      res.status(500).json({
        error: "Something went wrong",
      });
    }
  });

  app.get("/api/teams", async (req, res) => {
    try {
      const response = await fetch(
        "https://api.sportsdata.io/api/nfl/fantasy/json/Teams",
        {
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.SPORTS_DATA_API_KEY,
          },
        },
      );

      if (!response.ok) {
        return res.status(response.status).json({
          error: "Failed to retrieve NFL teams",
        });
      }

      const teamsData = await response.json();

      const teams = teamsData.map((team) => {
        const nflTeam = new Team(team.TeamID, team.FullName, team.Division);

        return nflTeam.getTeamInfo();
      });

      res.json(teams);
    } catch (error) {
      res.status(500).json({
        error: "Something went wrong",
      });
    }
  });

  app.get("/api/players", async (req, res) => {
    try {
      const response = await fetch(
        "https://api.sportsdata.io/api/nfl/fantasy/json/Players",
        {
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.SPORTS_DATA_API_KEY,
          },
        },
      );

      if (!response.ok) {
        return res.status(response.status).json({
          error: "Failed to retrieve NFL players",
        });
      }

      const playersData = await response.json();

      const players = playersData.map((player) => {
        const nflPlayer = new Player(
          player.PlayerID,
          `${player.FirstName} ${player.LastName}`,
          player.Team,
          player.Position,
        );

        return nflPlayer.getPlayerInfo();
      });

      res.json(players);
    } catch (error) {
      res.status(500).json({
        error: "Something went wrong",
      });
    }
  });

  app.get("/api/player-stats", async (req, res) => {
    try {
      const response = await fetch(
        "https://api.sportsdata.io/api/nfl/fantasy/json/PlayerSeasonStats/2025",
        {
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.SPORTS_DATA_API_KEY,
          },
        },
      );

      if (!response.ok) {
        console.log("SportsDataIO Status:", response.status);
        console.log("SportsDataIO Error:", await response.text());

        return res.status(response.status).json({
          error: "Failed to retrieve NFL player stats",
        });
      }
      const stats = await response.json();
      res.json(stats);
    } catch (error) {
      res.status(500).json({
        error: "Something went wrong",
      });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/api/health`);
  });
};

startServer();

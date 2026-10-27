const Player = require('./Player');
const Team = require('./Team');
const Standings = require('./Standings');
const User = require('./User');

const player = new Player("123", "Jaxson Dart", "Giants", "QB", {
    touchdowns: 12
});

const team = new Team("NYG", "New York Giants", "NFC East", {
    wins: 10,
    losses: 4
});

const standings = new Standings("Giants", 10, 4, 0, 1);

const user = new User(
    "football123",
    "armond@example.com",
    "exampleHash",
    ["Jaxson Dart"],
    ["Giants"]
);

console.log("PLAYER:", player.getPlayerInfo());
console.log("TEAM:", team.getTeamInfo());
console.log("STANDINGS:", standings.getStandingsInfo());
console.log("USER:", user.getUserInfo());

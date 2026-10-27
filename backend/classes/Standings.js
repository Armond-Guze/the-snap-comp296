class Standings {
    constructor(team, wins, losses, ties, rank) {
        this.team = team;
        this.wins = wins;
        this.losses = losses;
        this.ties = ties;
        this.rank = rank;
    }

    getStandingsInfo() {
        return {
            team: this.team,
            wins: this.wins,
            losses: this.losses,
            ties: this.ties,
            rank: this.rank
        };
    }
}

module.exports = Standings;
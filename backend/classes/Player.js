class Player {
    constructor(id, name, team, position, stats = {}) {
        this.id = id;
        this.name = name;
        this.team = team;
        this.position = position;
        this.stats = stats;
    }

    getPlayerInfo() {
        return {
            id: this.id,
            name: this.name,
            team: this.team,
            position: this.position,
            stats: this.stats
        };
    }
}

module.exports = Player;
class Team {
    constructor(id, name, division, record = {}) {
        this.id = id;
        this.name = name;
        this.division = division;
        this.record = record;
    }

    getTeamInfo() {
        return {
            id: this.id,
            name: this.name,
            division: this.division,
            record: this.record
        };
    }
}

module.exports = Team;
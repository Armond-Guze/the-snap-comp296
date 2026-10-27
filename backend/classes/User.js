class User {
    constructor(username, email, passwordHash, favoritePlayers = [], favoriteTeams = []) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.favoritePlayers = favoritePlayers;
        this.favoriteTeams = favoriteTeams;
    }

    getUserInfo() {
        return {
            username: this.username,
            email: this.email,
            favoritePlayers: this.favoritePlayers,
            favoriteTeams: this.favoriteTeams
        };
    }
}

module.exports = User;
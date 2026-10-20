const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// start the express server
const startServer = () => {

    app.use(express.json());

    app.get('/api/health', (req, res) => {
        res.json({ message: "Backend is ALL GOOD!"});
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`http://localhost:${PORT}/api/health`);
    });
}

startServer();
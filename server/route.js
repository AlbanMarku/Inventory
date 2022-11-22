const path = require('path');

const endpoint = app => {

    app.get("/api", (req, res) => {
        res.json({ message: '👋 from Express!' });
    });


    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
};

module.exports = {
    endpoint
}
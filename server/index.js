const express = require('express'),
    path    = require('path'),
    route   = require('./route.js'),
    app     = express(),
    port    = 8080;
    mongoose = require("mongoose")
    
const MONGO_USER = process.env.MONGO_USER,
    MONGO_PWD = process.env.MONGO_PWD,
    CLUSTER_NAME = process.env.CLUSTER_NAME,
    CLUSTER_ID = process.env.CLUSTER_ID

app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use("/photo",express.static("imgs"));
app.use(express.json({limit: "1mb", strict: true}));

const dbURI = `mongodb+srv://albanshqiptar:alban4321@inventorycluster.v0kg7cq.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((res) => {
    app.listen(port);
    route.endpoint(app);
    console.log("Connected to db!")
})
.catch((err) => console.log(err));

console.log(`API server is listening on port:${port}`);
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const route = require('./route');
// require('dotenv').config({ path: './.env' });

const app = express();
const port = process.env.PORT || 8080;

const { MONGO_USER } = process.env;
const { MONGO_PWD } = process.env;
const { CLUSTER_NAME } = process.env;
const { CLUSTER_ID } = process.env;

app.use(express.static(path.resolve(__dirname, '../client/dist')));
// app.use('/photo', express.static('imgs'));
app.use(express.json({ limit: '1mb', strict: true }));

const dbURI = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${CLUSTER_NAME}.${CLUSTER_ID}.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port);
    route.endpoint(app);
    console.log('Connected to db!');
  })
  .catch((err) => console.log(err));

console.log(`API server is listening on port:${port}`);

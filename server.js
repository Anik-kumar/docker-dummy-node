'use strict';

const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Constants
const PORT = 3000;
const mongoLocalUrl = "mongodb://admin:password@localhost:27017";
const mongoDockerUrl = "mongodb://admin:password@mongodb-container";
const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const database = "user-account";

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/get-profile', (req, res) => {

  MongoClient.connect(mongoLocalUrl, mongoClientOptions, (err, client) => {
    if(err) throw err;
    // console.log("COnnected to database");
    let db = client.db(database);
    let query = { userId: 1 };
    db.collection('users').findOne(query, (err, result) => {
      if(err) throw err;

      client.close();
      // console.log("Disconnected from database");
      res.send(result);
    });
  });
});

app.post('/update-profile', (req, res) => {
  const userObj = req.body;
  // console.log("user obj ", userObj);
  // console.log('connecting to db...');
  userObj['userId'] = 1;

  MongoClient.connect(mongoLocalUrl, mongoClientOptions, (err, client) => {
    if(err) throw err;
    // console.log("COnnected to database");
    let db = client.db(database);
    let query = { userId: 1 };
    let newValue = { $set: userObj };
    db.collection('users').updateOne(query, newValue, {upsert: true}, (err, result) => {
      if(err) throw err;
      // console.log("Data updated");
      client.close();
      // console.log("Disconnected from database");
    });
  });
  res.send(userObj);
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
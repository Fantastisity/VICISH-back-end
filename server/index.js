const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD,PATCH');
  res.header('Access-Control-Allow-Headers', 'access-control-allow-origin,*/*,text/plain,Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

const db = mysql.createPool({
  user: "bb019ed7eab21c",
  host: "us-cdbr-east-06.cleardb.net",
  password: "a7fb25f2",
  database: "heroku_00077ded25ddaeb",
});


app.get("/landmark", (req, res) => {
  const n = parseInt(req.query.num);
  db.query(`
  SELECT *
  FROM landmark
  LIMIT ?;
  `, [n], (err, result) => {
    if (err) {
      throw new Error('Something went wrong!' + err);
    } else {
      res.send(result);
    }
  });
});

app.get("/artwork", (req, res) => {
  const n = parseInt(req.query.num);
  db.query(`
  SELECT *
  FROM artwork
  LIMIT ?;
  `, [n], (err, result) => {
    if (err) {
      throw new Error('Something went wrong!' + err);
    } else {
      res.send(result);
    }
  });
});

app.get("/music", (req, res) => {
  const n = parseInt(req.query.num);
  db.query(`
  SELECT *
  FROM music
  LIMIT ?;
  `, [n], (err, result) => {
    if (err) {
      throw new Error('Something went wrong!' + err);
    } else {
      res.send(result);
    }
  });
});

app.get("/englishquiz", (req, res) => {
  db.query(`SELECT ans FROM englishquiz;`, (err, result) => {
    if (err) {
      throw new Error('Something went wrong!' + err);
    } else {
      res.send(result);
    }
  });
});

app.get("/slangquiz", (req, res) => {
  db.query(`SELECT * FROM quiz;`, (err, result) => {
    if (err) {
      throw new Error('Something went wrong!' + err);
    } else {
      res.send(result);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log("Yey, your server is running");
});
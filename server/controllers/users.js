const express = require("express");
const users = require("../models/users");

const app = express.Router();

app
  .get("/", (req, res, next) => {
    users
      .getUsers()
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .post("/create-user", (req, res, next) => {
    users
      .createUser(req.body)
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  .post("/authenticate", (req, res, next) => {
    users
      .authenticate(req.body)
      .then((x) => res.status(200).send(x))
      .catch(next);
  })
  

module.exports = app;
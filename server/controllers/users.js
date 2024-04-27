const express = require("express");
const users = require("../models/users");

const app = express.Router();

app.post("/create-user", (req, res, next) => {
  users
    .createUser(req.body)
    .then((x) => res.status(200).send(x))
    .catch(next);
});

module.exports = app;
const express = require("express");
const acvivity = require("../models/activity");

const app = express.Router();

app
    .get("/:userId", (req, res, next) => {
        acvivity
            .getUserActivity(req.params.userId)
            .then((x) => res.status(200).send(x))
            .catch(next);
    })
    .get("/friendsActivty/:userId", (req, res, next) => {
        acvivity
            .getUserFriendsActivities(req.params.userId)
            .then((x) => res.status(200).send(x))
            .catch(next);
    })
    .post("/", (req, res, next) => {
        acvivity
            .addActivity(req.body)
            .then((x) => res.status(200).send(x))
            .catch(next);
    })

module.exports = app;
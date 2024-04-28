const express = require("express");
const app = express();
const { connect } = require("./models/mongo");
const hostname = "localhost";
const port = 3000;
const usersController = require('./controllers/users');
const avtivityController = require('./controllers/activity');
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(express.json());

app
.use("/api/users/", usersController)
  .use("/api/activity", avtivityController);
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

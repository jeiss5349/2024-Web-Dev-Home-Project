const express = require("express");
const app = express();
const { connect } = require("./models/mongo");
const hostname = "localhost";
const port = 3000;
app.get("/check-status-mongo", async (req, res) => {
  const client = await connect();
  console.log(client);
  return res.status(200).send("Hii");
});
app.listen(port, () => {
    console.log(`Server running at ${port}`);
  });
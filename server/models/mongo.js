require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI ?? "mongodb+srv://jeiss3341:temppassword4321@cluster0.wj7or25.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

module.exports = {
  connect: () => client.connect(),
};
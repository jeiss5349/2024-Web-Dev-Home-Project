const { connect } = require("./mongo");
const COLLECTION_NAME = "users";
async function createUser(data) {
  console.log(data);
  const users = await collection();
  const existingUserName = await users.findOne({ userName: data.userName });
  const existingEmail = await users.findOne({ email: data.email });
  let message = {
    text: "",
    type: "",
  };
  if (existingUserName) {
    message.text = "Error! Username already exists";
    message.type = "danger";
    return message;
  }
  if (existingEmail) {
    message.text = "Error! Email already exists";
    message.type = "danger";
    return message;
  }
  const user = {
    userName: data.userName.toLowerCase(),
    password: data.password,
    email: data.email.toLowerCase(),
    isAdmin: false,
    profilePicture: "../assets/user-placeholder.png",
    friends: [],
    friendRequests: [],
  };
  await users.insertOne(user);
  message.text = "Account successfully created!";
  message.type = "success";
  return message;
}

async function collection() {
  const client = await connect();
  return client.db("sports_life").collection(COLLECTION_NAME);
}

module.exports = {
  createUser,
};

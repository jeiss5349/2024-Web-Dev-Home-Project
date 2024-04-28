const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const User = mongoose.model('users', new Schema({
  userName: String,
  password: String,
  email: String,
  isAdmin: Boolean,
  profilePicture: String,
  friends: [Number],
  friendRequests: [Number]
}));


async function getUsers(){
  return User.find({});
}

async function getUser(userName) {
  let user;
  if (userName.includes("@")) {
    user = await User.findOne({ email: userName.toLowerCase() });
  } else {
    user = await User.findOne({ userName :userName.toLowerCase() });
  }

  if (!user) {
    let message = {
      text: "User does not exist",
      type: "danger",
    }
    return message;
  }
  return user;
}

async function getUserById(userId){
  return await User.findById(userId);
}

async function createUser(data) {
  const existingUserName = await User.findOne({ userName: data.userName });
  const existingEmail = await User.findOne({ email: data.email });
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
  await User.create(user);
  message.text = "Account successfully created!";
  message.type = "success";
  return message;
}

async function authenticate(data) {
  const { userName, password, email } = data;
  const user = await getUser(userName);
  if (user) {
    if (user.password === password && (user.userName === userName.toLowerCase() || user.email === userName.toLowerCase())) {
      return {
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: await jwt.sign(
          {
            _id: user._id
          },
          '1234!@#$',
          {
            expiresIn: '30 days'
          }
        )
      };
    }
  }
  let message = {
    text: "Invalid username or password",
    type: "danger",
  }
  return message;
}

module.exports = {
  createUser,
  getUsers,
  authenticate,
  getUserById
};

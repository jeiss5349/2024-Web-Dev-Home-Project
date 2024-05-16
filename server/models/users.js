const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const User = mongoose.model('users', new Schema({
  firstName : String,
  lastName : String,
  userName: String,
  password: String,
  email: String,
  isAdmin: Boolean,
  profilePicture: String,
  friends: [String],
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
    firstName: data.firstName,
    lastName: data.lastName,
    userName: data.userName.toLowerCase(),
    password: data.password,
    email: data.email.toLowerCase(),
    isAdmin: data.isAdmin ? true :  false,
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
        _id : user._id,
        userName: user.userName,
        password : user.password,
        email: user.email,
        isAdmin: user.isAdmin,
        type : 'success',
        token: jwt.sign(
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

async function deleteUser(userId){
  return await User.deleteOne({ _id : userId });
}

async function searchUser(userName){
  return await User.find({ userName: { $regex: new RegExp(userName, 'i') } }).limit(10).lean();
}

async function addUserFriend(userId, friendId) {
  const FoundUser = await User.findOne({ friends: { $in: friendId } });
  let message = {
    text: "",
    type: "",
  };
  if (FoundUser) {
    message.text = "User is already Your Friend";
    message.type = "danger";
    return message;
  }
  await User.findByIdAndUpdate(
    userId,
    { $addToSet: { friends: friendId } },
    { new: true }
  );
  message.text = "User added as a friend";
  message.type = "succes";
  return message;
}

module.exports = {
  createUser,
  getUsers,
  authenticate,
  getUserById,
  deleteUser,
  searchUser,
  addUserFriend
};

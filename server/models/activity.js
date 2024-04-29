const mongoose = require('mongoose');
const { getUserById } = require('./users');
const Schema = mongoose.Schema;
const user = require('./users');

const UserActivity = mongoose.model('userActivity', new Schema({
    userId: String,
    title: String,
    date: Date,
    picture: String
}));

async function addActivity(data) {
    await UserActivity.create({
        title: data.title,
        userId: data.userId,
        date: data.date ?? new Date(),
        picture: data.picture
    });
    return {
        message: 'Avtivity Added.',
        type: 'success'
    }
}

async function getUserActivity(userId) {
    return await UserActivity.find({ userId });
}

async function getUserFriendsActivities(userId) {
    const user = await getUserById(userId);
    let users = [];
    const userFriends = user.friends;
    if (userFriends.length) {
        for(let userFriend of userFriends){
            const user = await getUserById(userFriend);
            const userActivity = getUserActivity(userFriend);
            users.push({
                user : user ,
                userActivity : userActivity
            });
        }
    }
    return users;
}

module.exports = {
    addActivity,
    getUserActivity,
    getUserFriendsActivities
}
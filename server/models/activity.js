const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        date: new Date(),
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

async function getUserFriendsActivities() { }

module.exports = {
    addActivity,
    getUserActivity,
    getUserFriendsActivities
}
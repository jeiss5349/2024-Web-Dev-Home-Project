const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserActivity = mongoose.model('userActivity', new Schema({
    userId: Number,
    title: String,
    date: Date,
    picture: String
}));

async function addActivity(data){}

async function getUserActivity(){}

async function getUserFriendsActivities(){}
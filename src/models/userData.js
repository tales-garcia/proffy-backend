const mongoose = require('../database/index');

const UserDataSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    classes: {
        type: Array,
        required: false,
        default: []
    },
    favorites: {
        type: Array,
        required: false,
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const UserData = mongoose.model('UserData', UserDataSchema);

module.exports = UserData;
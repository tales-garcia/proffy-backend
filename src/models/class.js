const mongoose = require('../database/index');
const convertHoursToMinutes = require('../utils/convertTime');

const ClassSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    teacherId: {
        type: String,
        required: true
    },
    schedules: {
        type: Array,
        required: false,
        default: []
    },
    cost: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ClassSchema.pre('save', function(next) {
    this.schedules.forEach(schedule => {
        const fromMinutes = convertHoursToMinutes(schedule.from);
        schedule.from = fromMinutes;

        const toMinutes = convertHoursToMinutes(schedule.to);
        schedule.to = toMinutes;
    });
    
    next();
});

const Class = mongoose.model('Class', ClassSchema);

module.exports = Class;
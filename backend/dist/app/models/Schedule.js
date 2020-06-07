"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScheduleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    month: {
        type: String,
        required: true,
        trim: true
    },
    day: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    users: [String]
}, {
    timestamps: true
});
exports.default = mongoose_1.model('Schedule', ScheduleSchema);

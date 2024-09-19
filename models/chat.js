const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    Date: {
        type: Date,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    bp: {
        type: String,
        maxLength: 50
    },
    bpm: {
        type: Number,
        required: true
    }
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;

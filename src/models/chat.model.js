const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    author: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },

})

const ChatModel = mongoose.model('Chat', chatSchema);

module.exports = ChatModel;
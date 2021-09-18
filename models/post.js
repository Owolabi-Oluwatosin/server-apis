const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    file: {
        type: String
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [{
        text: String,
        postedBy: { type: ObjectId, ref: "User" },
        comments_at: { type: Date, default: Date.now }
    }],
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema);
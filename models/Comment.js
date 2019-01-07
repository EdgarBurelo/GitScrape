const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
    title: String,
    body: String,
    user: String
});

let Comment = mongoose.model("Note", CommentSchema);

module.exports = Comment;
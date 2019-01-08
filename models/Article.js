const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: {
        type: String,
        required:true
    },
    link: {
        type:String,
        required:true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

let Article = mongoose.model("Article", articleSchema);

module.exports = Article;
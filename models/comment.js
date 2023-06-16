const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  message: { type: String, required: true, maxLength: 500 },
  post: { type: Schema.ObjectId, required: true },
  user: { type: Schema.ObjectId, ref: "User" },
  timestamp: { type: date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);

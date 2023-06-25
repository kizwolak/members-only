const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: false, maxLength: 60 },
  message: { type: String, required: true, maxLength: 500 },
  creator: { type: Schema.ObjectId, ref: "Creator" },
  timestamp: { type: Date, default: Date.now },
  parent_message: { type: Schema.ObjectId, required: false },
});

MessageSchema.virtual("url").get(function () {
  return "/messages/" + this._id;
});

module.exports = mongoose.model("Message", MessageSchema);

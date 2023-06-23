const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 20 },
  last_name: { type: String, required: true, maxLength: 30 },
  username: { type: String, required: true, maxLength: 15 },
  password: { type: String, required: true, maxLength: 60 },
  club: [{ type: Schema.ObjectId, required: true }],
});

UserSchema.virtual("full_name").get(function () {
  return this.first_name + " " + this.last_name;
});

UserSchema.virtual("url").get(function () {
  return "/users/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);

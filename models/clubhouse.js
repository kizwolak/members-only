const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClubhouseSchema = new Schema({
  messages: [{ type: Schema.ObjectId, required: true }],
  owner: { type: Schema.ObjectID, required: true },
  mods: [{ type: Schema.ObjectId }],
});

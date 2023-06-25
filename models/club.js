const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ClubSchema = new Schema({
  name: { type: String, required: true, maxLength: 100, minLength: 1 },
  messages: [{ type: Schema.ObjectId, required: true }],
  owner: { type: Schema.ObjectId, required: true },
  mods: [{ type: Schema.ObjectId }],
  join_code: { type: String, default: generateCode() },
});

ClubSchema.virtual("url").get(function () {
  return "/clubs/view-club/" + this._id;
});

function generateCode() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 12) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
    if (result.length === 4 || result.length === 9) {
      result += "-";
    }
  }
  return result;
}

module.exports = mongoose.model("Club", ClubSchema);

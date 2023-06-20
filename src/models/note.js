const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  category: {
    type: String,
    enum: ["reminder", "regular", "important", "random"],
    default: "reminder",
  },
  title: {
    type: String,
    unique: true,
    required: [true, "Please provide a title of the note"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description for the note"],
  },
});

module.exports = { noteSchema };

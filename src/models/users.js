const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { noteSchema } = require("./note");

const Schema = mongoose.Schema;

const users = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a user name"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please provide an email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
  },
  notes: {
    type: [noteSchema],
    default: [],
  },
});
users.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (this.passwordConfirm !== this.password) {
    throw new Error("Password does not match");
  } else next();
});

users.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

users.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Users = mongoose.model("Users", users);
module.exports = { Users };

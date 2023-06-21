const { Router } = require("express");
const { API } = require("../../constants");
const { protectRoute } = require("../functions/auth/protectRoute");
const { Users } = require("../models/users");

const router = Router();

router.post(API.routes.addNote, protectRoute, async (req, res) => {
  try {
    const note = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    };
    const email = req.body.email;

    if (!note.title || !note.description || !note.category || !email) {
      throw new Error("missing arguments");
    }

    const user = await Users.findOne({ email }).select("+password");
    user.notes.push(note);
    await user.save();

    res.status(201).send({
      status: "success",
      message: "created new note",
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      status: "error",
      message: err.message ?? "something went wrong",
    });
  }
});

module.exports = {
  addNote: router,
};

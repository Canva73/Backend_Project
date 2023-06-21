const { Router } = require("express");
const { API } = require("../../constants");
const { protectRoute } = require("../functions/auth/protectRoute");
const { Users } = require("../models/users");

const router = Router();

router.post(API.routes.editNote, protectRoute, async (req, res) => {
  try {
    const email = req.params.email;
    const noteName = req.params.name;

    if (!email || !noteName) {
      throw new Error("argument is missing!");
    }
    if (!req.body.title || !req.body.description || !req.body.category) {
      throw new Error("argument is missing!");
    }

    const editeNote = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    };

    const user = await Users.findOne({ email });

    user.notes = user.notes.map((note) => {
      if (note.title === noteName) {
        return editeNote;
      } else {
        return note;
      }
    });
    user.save();

    res.status(200).send({
      status: "success",
      message: "edited note",
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
  editNote: router,
};

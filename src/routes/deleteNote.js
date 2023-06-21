const { Router } = require("express");
const { API } = require("../../constants");
const { protectRoute } = require("../functions/auth/protectRoute");
const { Users } = require("../models/users");

const router = Router();

router.post(API.routes.deleteNote, protectRoute, async (req, res) => {
  try {
    const email = req.params.email;
    const noteName = req.params.name;

    if (!email || !noteName) {
      throw new Error("argument is missing!");
    }

    const user = await Users.findOne({ email });

    user.notes = user.notes.filter((note) => note.title !== noteName);
    user.save();

    res.status(200).send({
      status: "success",
      message: "deleted note",
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
  deleteNote: router,
};

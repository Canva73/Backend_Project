const { Router } = require("express");
const { API } = require("../../constants");
const { protectRoute } = require("../functions/auth/protectRoute");
const { Users } = require("../models/users");

const router = Router();

router.get(API.routes.getNotes, protectRoute, async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      throw new Error("email is missing!");
    }

    const user = await Users.findOne({ email })

    console.log(user.notes);

    res.status(200).send({
      status: "success",
      notes: user.notes,
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
  getNotes: router,
};

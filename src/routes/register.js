const { Router } = require("express");
const { Users } = require("../models/users");
const { API } = require("../../constants");
const { createSendToken } = require("../functions/auth/createSendToken");

const router = Router();

router.post(API.routes.register, async (req, res) => {
  try {
    console.log("register route is called", { body: req.body });
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.passwordConfirm
    ) {
      throw new Error("Sign up parameter is missing");
    }

    const newUser = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      notes: [],
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    console.log({ err });
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = {
  register: router,
};

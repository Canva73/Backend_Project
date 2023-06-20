const { Router } = require("express");
const { Users } = require("../models/users");
const jwt = require("jsonwebtoken");
const { API } = require("../../constants");
const { createSendToken } = require("../functions/auth/createSendToken");

const router = Router();

router.post(API.routes.login, async (req, res) => {
  try {
    console.log("login route is called");
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      throw new Error("Please provide email and password!");
    }

    // 2) Check if user exists && password is correct
    const user = await Users.findOne({ email }).select("+password");
    console.log({ user });

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error("Incorrect email or password");
    }

    createSendToken(user, 200, res);
  } catch (err) {
    console.log({ err });
    res.status(401).send({
      status: "failed",
      message: err.message | "",
    });
  }
});

module.exports = {
  login: router,
};

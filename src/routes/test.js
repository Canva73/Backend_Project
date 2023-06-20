const { Router } = require("express");
const { API } = require("../../constants");
const { Users } = require("../models/users");

const router = Router();

// TODO
router.get(API.routes.test, async (req, res) => {
  console.log("test route is called");
  res.send("test route works..");
});

module.exports = {
  test: router,
};

const jwt = require("jsonwebtoken");
const { jwtSecret, expiresIn } = require("../../../constants");

const signToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn,
  });
};

module.exports = {
  signToken,
};

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../constants");
const { Users } = require("../../models/users");

const isAllowedAccess = async (req) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new Error("You are not logged in! Please log in to get access.");
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, jwtSecret);

  // 3) Check if user still exists
  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    throw new Error("The user belonging to this token does no longer exist.");
  }

  return currentUser;
};

module.exports = {
  isAllowedAccess,
};

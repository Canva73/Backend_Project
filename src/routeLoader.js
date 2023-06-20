const { login } = require("./routes/login");
const { register } = require("./routes/register");
const { test } = require("./routes/test");

// loading each route
const loadRoutes = (app) => {
  app.use(login);
  app.use(register);
  app.use(test);
};

module.exports = {
  loadRoutes,
};

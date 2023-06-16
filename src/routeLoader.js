const { register } = require("./routes/register");


// loading each route
const loadRoutes = (app) => {
  app.use(register);
};

module.exports = {
  loadRoutes,
};

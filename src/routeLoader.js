const { login } = require("./routes/login");
const { register } = require("./routes/register");
const { test } = require("./routes/test");
const { getNotes } = require("./routes/getNotes");
const { addNote } = require("./routes/addNote");
const { deleteNote } = require("./routes/deleteNote");
const { editNote } = require("./routes/editNote");

// loading each route
const loadRoutes = (app) => {
  app.use(login);
  app.use(register);
  app.use(test);
  app.use(getNotes);
  app.use(addNote);
  app.use(deleteNote);
  app.use(editNote);
};

module.exports = {
  loadRoutes,
};

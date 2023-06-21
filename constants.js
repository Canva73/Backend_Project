require("dotenv").config();

const port = process.env.PORT || 8000;
const dbUri = process.env.DB_URI || "";
const jwtSecret = process.env.JWT_SECRET || "";
const expiresIn = process.env.EXPIRES_IN || "";
const jwtCookieExpiresIn = process.env.expiresIn || "";

const API = {
  routes: {
    editNote: "/editNote/:email/:name",
    addNote: "/addNote",
    deleteNote: "/deleteNote/:email/:name",
    getNotes: "/getNotes/:email",
    login: "/login",
    register: "/register",
    test: "/test",
  },
};

const noteCategories = {
  reminder: "reminder",
  regular: "regular",
  important: "important",
  random: "random",
};

module.exports = {
  port,
  dbUri,
  jwtSecret,
  expiresIn,
  API,
  jwtCookieExpiresIn,
  noteCategories,
};

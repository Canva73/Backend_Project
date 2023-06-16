const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const { port, dbUri } = require("../constants");
const { loadRoutes } = require("./routeLoader");

require("dotenv").config();

const app = express(); // initiallizing express
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

loadRoutes(app); // loading all routes

const start = async () => {
  try {
    await mongoose.connect(dbUri);

    app.listen(port, () => {
      console.log(`Started listening on port ${port}...`);
    });
  } catch (e) {
    console.log("Something went wrong during server launch.. ", e);
  }
};

start();

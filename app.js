const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const express = require("express");

const app = express(); // initialize app

const config = {
  views: "views",
  static: "public",
  logging: true,
};

vertex.configureApp(app, config);

// import routes
const index = require("./routes/index");

// set routes
app.use("/", index);

module.exports = app;

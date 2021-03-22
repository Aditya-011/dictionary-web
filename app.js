const vertex = require("vertex360")({ site_id: process.env.TURBO_APP_ID });
const express = require("express");
const ejs = require("ejs");
const app = express(); // initialize app
app.set("view engine", ejs);
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

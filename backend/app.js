const express = require("express");
const app = express();
const { loginUser, createUser } = require("./src/controllers/userController");
const {
  handle404,
  handleDefaultErrors,
  handleDBErrors,
} = require("./src/controllers/errorHandler");
const baseurl = "";

app.use(express.json());

// routes go here

app.post(`${baseurl}/register`, createUser);

app.post(`${baseurl}/login`, loginUser);

// Error handling middleware
app.use(handleDBErrors); // Handle DB-specific errors first
app.use(handleDefaultErrors); // Handle custom errors (400, 404, etc.)
app.use(handle404); // Catch any unhandled 404s (e.g., invalid routes)

module.exports = app;

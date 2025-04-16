const express = require("express");
const app = express();
const { loginUser, createUser } = require("./src/controllers/userController");
const { validateRegistration, validateLogin, handleDefaultErrors, handleDBErrors } = require("./src/middleware");
const baseurl = "";

app.use(express.json());

// Routes with middleware
app.post(`${baseurl}/register`, validateRegistration, createUser);

app.post(`${baseurl}/login`, validateLogin, loginUser);


// handle invalid routes gracefully
app.use((req, res, next) => {
  const error = new Error('Not Found - The requested resource does not exist');
  error.status = 404;
  next(error); // Pass to error handlers
});

// Error handling middleware
app.use(handleDBErrors); // Handle DB-specific errors first
app.use(handleDefaultErrors); // Handle custom errors (400, 404, etc.)

module.exports = app;

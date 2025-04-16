const express = require("express");
const app = express();
const { registerUser } = require("./src/controllers/users");
const { handle404, handlePostgresErrors, handleCustomErrors, handleServerErrors } = require("./src/controllers/errors")
const baseurl = "";


app.use(express.json());

// routes go here

app.post(`${baseurl}/register`, registerUser);


// app.all('/*', handle404);

app.use(handlePostgresErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;

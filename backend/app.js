const express = require("express");
const app = express();
const { registerUser } = require("./src/controllers/users");
const baseurl = "";


app.use(express.json());

// routes go here

app.post(`${baseurl}/register`, registerUser);

module.exports = app;

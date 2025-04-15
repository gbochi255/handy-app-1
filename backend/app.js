const express = require("express");
const { registerUser } = require("./src/controllers/users");
const PORT = 3000;
const app = express();
const baseurl = "";

app.listen(PORT, () => console.log(`server running on ${PORT}`));

app.use(express.json());

// routes go here

app.post(`${baseurl}/register`, registerUser);

module.exports = app;

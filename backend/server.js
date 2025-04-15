const express = require("express");
const  PORT  = require("./connection");
const app = express();

app.listen(PORT, () => console.log(`server running on ${PORT}`));

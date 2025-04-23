const bidRouter = require("express").Router();

const { bidController } = require("../controllers/index");

bidRouter
.route("/")
.get(bidController.getBids)

module.exports = bidRouter
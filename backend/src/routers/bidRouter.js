const bidRouter = require("express").Router();

const { bidController } = require("../controllers/index");

bidRouter
.route("/:job_id")
.get(bidController.getBids)

module.exports = bidRouter
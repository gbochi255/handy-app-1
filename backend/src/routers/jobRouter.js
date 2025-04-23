const jobRouter = require("express").Router();

const { jobController } = require("../controllers/index");

jobRouter
.route("/")
.get(jobController.getJobs)

jobRouter
.route("/client")
.get(jobController.getClientJobs)

jobRouter
.route("/:job_id")
.get(jobController.getJobByID)

jobRouter
.route("/provider/:provider_id")
.get(jobController.getProviderJobs)

jobRouter
.route("/provider/:provider_id/bids")
.get(jobController.getProviderBids)

jobRouter
.route("/provider/:provider_id/won")
.get(jobController.getProviderWonJobs)

jobRouter
.route("/create")
.post(jobController.createJob)

jobRouter
.route("/:job_id/bid")
.post(jobController.postBid)

jobRouter
.route("/:job_id/complete")
.patch(jobController.patchJobComplete)

jobRouter
.route("/:job_id/accept/:bid_id")
.patch(jobController.patchBidAccept)

module.exports = jobRouter
const { updateJobComplete, updateBidAccept, updateProviderStatus } = require("../models/patchModel")

exports.patchJobComplete = (request, response, next) => {
    const { job_id } = request.params
    updateJobComplete(Number(job_id))
    .then((job) => {
        response.status(200).send(job);
    })
    .catch(next)
}

exports.patchBidAccept = (request, response, next) => {
    const { job_id } = request.params
    const { bid_id } = request.params
    updateBidAccept(Number(job_id), Number(bid_id))
    .then((bids) => {
        response.status(200).send(bids);
    })
    .catch(next)
}

exports.patchProviderStatus = (request, response, next) => {
    const { user_id } = request.params
    const { isProvider } = request.body 
    updateProviderStatus(Number(user_id), isProvider)
    .then((user) => {
        response.status(200).send(user)
    })
    .catch(next)
}
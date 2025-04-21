const { updateJobComplete } = require("../models/patchModel")

exports.patchJobComplete = (request, response, next) => {
    const { job_id } = request.params
    updateJobComplete(job_id)
    .then((job) => {
        response.status(200).send(job);
    })
    .catch(next)
}
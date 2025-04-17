const { fetchJobs } = require("../models/jobModel")

exports.getJobs = (request, response, next) => {

    const { status, created_by, distance } = request.query;

    fetchJobs(status, created_by, distance)
    .then((jobs) => {
        response.status(200).send(jobs);
    })
    .catch(next)
};
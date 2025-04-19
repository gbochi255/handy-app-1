const { fetchJobs, fetchClientJobs } = require("../models/jobModel")

exports.getJobs = (request, response, next) => {

    const {  created_by, status  } = request.query;

    fetchJobs( created_by, status )
    .then((jobs) => {
        response.status(200).send(jobs);
    })
    .catch(next)
};


exports.getClientJobs = (request, response, next) => {
    console.log("Running getClientJobs")

    const { client_id, status } = request.query;
    console.log("client:", client_id)
    console.log("status:", status)

    fetchClientJobs( client_id, status )
    .then((jobs) => {
        response.status(200).send({jobs});
    })
    .catch(next)
};
const { promises } = require("supertest/lib/test");
const { fetchJobs, fetchClientJobs, fetchProviderJobs } = require("../models/jobModel")

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

exports.getProviderJobs = (request, response, next) => {
    console.log("Running getProviderJobs");
  
    const { user_id, distance, status } = request.query;
    console.log("user_id:", user_id);
    console.log("distance:", distance);
    console.log("status:", status);
  
    if (!user_id) {
    return Promise.reject({
        status: 400,
        message: 'User ID is required',
      })
    }
  
    if (status) {
      const validStatuses = ["open", "in_progress", "closed", "expired"];
      if (!validStatuses.includes(status)) {
        return Promise.reject({
            status: 400,
            message: 'Invalid status value',
          })
      }
    }
  
    let parsedDistance = 10;
    if (distance) {
      parsedDistance = parseFloat(distance);
      if (isNaN(parsedDistance) || parsedDistance <= 0) {
        return Promise.reject({status:400,
            message: "Distance must be a positive number"
        })
      }
    }
  
    fetchProviderJobs(user_id, parsedDistance, status)
      .then(jobs => {
        response.status(200).send({ jobs });
      })
      .catch(next);
  };
const { promises } = require("supertest/lib/test");
const { fetchJobs, fetchClientJobs, fetchProviderJobs } = require("../models/jobModel")
const jobModel = require("../models/jobModel");
const { request, response } = require("express");

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

  exports.getProviderBids = (request, response, next) => {
    console.log("Running getProviderBids");
  
    const { provider_id } = request.params;
    console.log("provider_id:", provider_id);
  
    jobModel
      .fetchProviderBids(provider_id)
      .then(jobs => {
        response.status(200).send({ jobs });
      })
      .catch(next);
  };
  
  exports.getProviderWonJobs = (request, response, next) => {
    console.log("Running getProviderWonJobs");
    
    const { provider_id } = request.params;
    console.log("provider_id:", provider_id);
    
    jobModel
    .fetchProviderWonJobs(provider_id)
    .then(jobs => {
      response.status(200).send({ jobs });
    })
    .catch(next);
  };
  
  exports.createJob = (request, response, next) => {
    console.log("Running postJob");
    const job=request.body

    console.log("body: ",job)
    
    // check for required fields 
    if (!job.summary||!job.job_detail||!job.category||!job.created_by||!job.photo_url||!job.postcode) {
      console.log ("Required paramaters missing from body")
      return Promise.reject({status: 400, message:"Required paramaters missing from body"})
    }

    jobModel.postJob (job).then(job => {
      response.status(200).send(job)
    })
    .catch(next)
  }
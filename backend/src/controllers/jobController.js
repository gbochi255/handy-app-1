const { fetchJobs, fetchClientJobs, fetchProviderJobs, updateJobComplete, updateBidAccept } = require("../models/jobModel")
const jobModel = require("../models/jobModel");

exports.getJobs = (request, response, next) => {

    const {  created_by, status  } = request.query;

    fetchJobs( created_by, status )
    .then((jobs) => {
        response.status(200).send(jobs);
    })
    .catch(next)
};


exports.getClientJobs = (request, response, next) => {

    const { client_id, status } = request.query;

    fetchClientJobs( client_id, status )
    .then((jobs) => {
        response.status(200).send({jobs});
    })
    .catch(next)
};

exports.getProviderJobs = (request, response, next) => {
  
    const { distance, status } = request.query;
    const {provider_id: user_id} = request.params
  
    if (!user_id) {
    return Promise.reject({
        status: 400,
        message: 'User ID is required',
      })
    }
  
    if (status) {
      const validStatuses = ["open", "accepted", "completed", "expired"];
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
  
    const { provider_id } = request.params;
  
    jobModel
      .fetchProviderBids(provider_id)
      .then(jobs => {
        response.status(200).send({ jobs });
      })
      .catch(next);
  };
  
  exports.getProviderWonJobs = (request, response, next) => {
    
    const { provider_id } = request.params;
    
    jobModel
    .fetchProviderWonJobs(provider_id)
    .then(jobs => {
      response.status(200).send({ jobs });
    })
    .catch(next);
  };
  
  exports.createJob = (request, response, next) => {
    const job=request.body

    // check for required fields 
    if (!job.summary||!job.job_detail||!job.created_by||!job.photo_url) {
      return Promise.reject({status: 400, message:"Required paramaters missing from body"})
    }

    jobModel.postJob (job).then(job => {
      response.status(200).send(job)
    })
    .catch(next)
  }

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

exports.getJobByID = (request, response, next) => {
  const {job_id} = request.params
  jobModel.fetchJobByID(Number(job_id)).then((jobDetail)=>{
    response.status(200).send(jobDetail)
  })
  .catch(next)
}

exports.postBid = (request, response, next) => {
  const bidData={job_id: request.params.job_id,
    amount: request.body.amount,
    provider_id: request.body.provider_id};
  jobModel.insertBid(bidData).then((bidResponse)=>{
      response.status(200).send(bidResponse)
  })
    .catch(next)
  }


const { request } = require("../../app")
const { fetchBids } = require("../models/bidModel")

exports.getBids = (request, response, next) => {
    console.log("Running getBids" )
    const {job_id} = request.params

    fetchBids(job_id).then((bids)=>{
        response.status(200).send({bids})
    })
    .catch(next)
    
}
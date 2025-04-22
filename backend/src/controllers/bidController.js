const { fetchBidsByJobId: fetchBids, fetchBidsByJobId: getBidsByJobId, fetchBidsByJobId } = require("../models/bidModel")

exports.getBids = (request, response, next) => {
    const {job_id} = request.params

    fetchBidsByJobId(job_id).then((bids)=>{
        response.status(200).send({bids})
    })
    .catch(next)
    
}
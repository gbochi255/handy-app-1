const db = require("../../db/connection")

exports.fetchBids = (job_id) => {
    console.log("Running fetchBids, job_id:", job_id)

    let queryStr=`SELECT 
    b.bid_id,
    b.provider_id,
    b.amount,
    b.status,
    u.firstname AS pr_firstname,
    u.lastname AS pr_lastname,
    u.avatar_url,
    b.created_at
     FROM bids b
     INNER JOIN users u ON b.provider_id = u.user_id
      WHERE b.job_id = $1;`

    return db.query(queryStr, [job_id])
    .then(({rows : bids})=>{
        if (bids.length ===0) {
            return Promise.reject(
                {
                status: 404, 
                message: "job_id not found"
                })
        }
        console.log({bids})
        return bids.map((bid) => ({
            ...bid,
            amount: parseFloat(bid.amount),
          }));
        })
    .catch((error)=>{
        console.log(error)
    })
    }


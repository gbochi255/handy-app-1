const db = require("../../db/connection")

exports.fetchBidsByJobId = (jobId) => {
    
    const queryStr=`
    SELECT 
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

    // check job exists
    return db.query(`SELECT 1 from jobs WHERE job_id = $1`, [jobId])
    .then(({rows})=>{
        if (rows.length===0) {
            return Promise.reject({
                status: 404,
                message: "JobId not found"
            })
        }

    return db.query(queryStr, [jobId])
    .then(({rows : bids})=>{
        return bids.map((bid) => ({
            ...bid,
            amount: parseFloat(bid.amount),
          }));
        })
    })
}

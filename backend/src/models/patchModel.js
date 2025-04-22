const db = require("../../db/connection")

exports.updateJobComplete = (job_id) => {

    let queryStr = `
    UPDATE jobs
    SET status = 'completed',
    completion_date = CURRENT_TIMESTAMP
    WHERE job_id = $1
    RETURNING *;
  `;


    return db.query(queryStr, [job_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    message: 'Job Not found',
                })
            }
            return rows[0];
        })
}


exports.updateBidAccept = (job_id, bid_id) => {

    let queryStr = `
    UPDATE bids
    SET status = CASE
        WHEN bid_id = $2 AND job_id = $1 THEN 'accepted'::bid_status
        WHEN bid_id != $2 AND job_id = $1 THEN 'rejected'::bid_status
    END
    WHERE job_id = $1
    RETURNING *;
  `;

    return db.query(queryStr, [job_id, bid_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    message: 'Job Not found',
                })
            }
            const bidExists = rows.some(row => row.bid_id === bid_id)
            if (!bidExists) {
                return Promise.reject({
                    status: 404,
                    message: 'Bid Not found',
                })
            }
            return rows;
        })
}


exports.updateProviderStatus = (user_id, isProvider) => {
    let queryStr = `
    UPDATE users
    SET is_provider = $2
    WHERE user_id = $1
    RETURNING *
    `

    return db.query(queryStr, [user_id, isProvider])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    message: 'User Not found',
                })
            }
            // console.log(rows)
            return rows[0];
        })
}
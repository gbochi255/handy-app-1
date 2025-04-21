const db = require("../../db/connection")

exports.updateJobComplete = (job_id) => {

    let queryStr = `
    UPDATE jobs
    SET status = 'completed',
    completion_date = CURRENT_TIMESTAMP
    WHERE job_id = $1
    RETURNING *
  `;


    return db.query(queryStr, [job_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({
                    status: 404,
                    message: 'Job Not found',
                  })
            }
            return rows[0]
        })
}
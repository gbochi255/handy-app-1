const db = require("../../db/connection")

exports.fetchJobs = (status, created_by) => {

    let queryStr = `SELECT * FROM jobs j
    WHERE ($1::job_status IS NULL OR j.status = $1)
    AND ($2::integer IS NULL OR j.created_by = $2);`


    let queryVars = [status || null, created_by || null]


    return db.query(queryStr, [...queryVars])
        .then(({ rows }) => {
            return { jobs: rows }
        })
}
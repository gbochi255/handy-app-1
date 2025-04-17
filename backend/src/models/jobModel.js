const db = require("../../db/connection")

exports.fetchJobs = (status, created_by) => {

    let queryStr = `SELECT * FROM jobs`

    if(status || created_by) queryStr += ` WHERE`
    if(status) queryStr += ` status = '${status}'`
    if(status && created_by) queryStr += ` AND`
    if(created_by) queryStr += ` created_by = ${created_by}`

console.log(queryStr)

    return db.query(queryStr)
    .then(({ rows }) => {
        return { jobs: rows }
    })
}
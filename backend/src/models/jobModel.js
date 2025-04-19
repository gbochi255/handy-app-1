const db = require("../../db/connection")
const { checkUserExists } = require("../utils/validation");

exports.fetchJobs = ( created_by, status ) => {

    // let queryStr = `SELECT * FROM jobs j
    // WHERE ($1::job_status IS NULL OR j.status = $1)
    // AND ($2::integer IS NULL OR j.created_by = $2);`

    let queryStr = `SELECT * FROM jobs j
    WHERE ($1::job_status IS NULL OR j.status = $1)
    AND ($2::integer IS NULL OR j.created_by = $2);`


    let queryVars = [status || null, created_by || null]


    return db.query(queryStr, [...queryVars])
        .then(({ rows }) => {
            return { jobs: rows }
        })
}

exports.fetchClientJobs = (client_id, status) => {
    console.log("Running fetchClientJobs");
  
    const validateClient = client_id
      ? checkUserExists(client_id)
      : Promise.resolve();
  
    return validateClient
      .then(() => {
        let queryStr = `
          SELECT j.*,
                 COUNT(b.bid_id) AS bid_count,
                 MIN(b.amount) AS best_bid
          FROM jobs j
          LEFT JOIN bids b ON j.job_id = b.job_id
        `;
  
        const queryParams = [];
        const conditions = [];
  
        if (client_id) {
          conditions.push(`j.created_by = $${queryParams.length + 1}`);
          queryParams.push(client_id);
        }
  
        if (status) {
          conditions.push(`j.status = $${queryParams.length + 1}`);
          queryParams.push(status);
        }
  
        if (conditions.length > 0) {
          queryStr += " WHERE " + conditions.join(" AND ");
        }
  
        queryStr += `
          GROUP BY j.job_id
          ORDER BY j.date_posted DESC
        `;
  
        console.log("QueryStr:", queryStr, queryParams);
  
        return db.query(queryStr, [...queryParams]);
      })
      .then(({ rows }) => {
        console.log("returned:", rows.length);
        return rows;
      });
  };
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

  exports.fetchProviderJobs = (user_id, distance = 10, status) => {
    console.log("Running fetchProviderJobs");
  
    return db.query("SELECT location, is_provider FROM users WHERE user_id = $1", [user_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          const error = new Error("Provider ID not found");
          error.status = 404;
          throw error;
        }
  
        const user = rows[0];
        if (!user.is_provider) {
          const error = new Error("User is not a provider");
          error.status = 404;
          throw error;
        }
  
        let queryStr = `
          SELECT j.*,
                 ROUND(
                   (ST_Distance($1::geography, j.location::geography) / 1609.34)::numeric,
                   3
                 )::double precision AS distance
          FROM jobs j
        `;
  
        const queryParams = [user.location];
        const conditions = [];
  
        conditions.push(`ST_DWithin($1::geography, j.location::geography, $2)`);
        queryParams.push(distance * 1609.34);
  
        if (status) {
          conditions.push(`j.status = $${queryParams.length + 1}`);
          queryParams.push(status);
        }
  
        if (conditions.length > 0) {
          queryStr += " WHERE " + conditions.join(" AND ");
        }
  
        queryStr += `
          ORDER BY ST_Distance($1::geography, j.location::geography) ASC
        `;
  
        console.log("QueryStr:", queryStr, queryParams);
  
        return db.query(queryStr, queryParams);
      })
      .then(({ rows }) => {
        console.log("returned:", rows.length);
        return rows;
      });
  };
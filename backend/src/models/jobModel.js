const db = require("../../db/connection")
const { checkUserExists } = require("../utils/validation");

exports.fetchJobs = ( created_by, status ) => {

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
  
    let validateClient = Promise.resolve();
    if (client_id) {
      validateClient = checkUserExists(client_id);
    }
  
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
  
        return db.query(queryStr, [...queryParams]);
      })
      .then(({ rows }) => {
        console.log("returned:", rows.length);
        return rows;
      });
  };

  exports.fetchProviderJobs = (user_id, distance = 10, status) => {
    console.log("Running fetchProviderJobs");
  
    return checkUserExists(user_id, true)
      .then(() => {
        let queryStr = `
          SELECT j.*,
                 ROUND(
                   (ST_Distance(
                     (SELECT location FROM users WHERE user_id = $1)::geography,
                     j.location::geography
                   ) / 1609.34)::numeric,
                   3
                 )::double precision AS distance
          FROM jobs j
        `;
  
        const queryParams = [user_id];
        const conditions = [];
  
        conditions.push(`ST_DWithin(
          (SELECT location FROM users WHERE user_id = $1)::geography,
          j.location::geography,
          $2
        )`);
        queryParams.push(distance * 1609.34);
  
        if (status) {
          conditions.push(`j.status = $${queryParams.length + 1}`);
          queryParams.push(status);
        }
  
        if (conditions.length > 0) {
          queryStr += " WHERE " + conditions.join(" AND ");
        }
  
        queryStr += `
          ORDER BY ST_Distance(
            (SELECT location FROM users WHERE user_id = $1)::geography,
            j.location::geography
          ) ASC
        `;
  
        return db.query(queryStr, queryParams);
      })
      .then(({ rows }) => {
        console.log("returned:", rows.length);
        return rows;
      });
  };

  const fetchProviderJobsWithBids = (provider_id, additionalSelect = '', whereConditions) => {
    console.log(`Running fetchProviderJobsWithBids for provider_id: ${provider_id}`);
  
    return checkUserExists(provider_id, true)
      .then(() => {
        let queryStr = `
          SELECT j.*,
                 ROUND(
                   (ST_Distance(
                     (SELECT location FROM users WHERE user_id = $1)::geography,
                     j.location::geography
                   ) / 1609.34)::numeric,
                   3
                 )::double precision AS distance
                 ${additionalSelect}
          FROM jobs j
          JOIN bids b ON j.job_id = b.job_id
          WHERE b.provider_id = $1
          ${whereConditions}
          ORDER BY j.date_posted DESC
        `;
  
        const queryParams = [provider_id];

        return db.query(queryStr, queryParams);
      })
      .then(({ rows }) => {
        console.log("returned:", rows.length);
        return rows;
      });
  };
  
  exports.fetchProviderBids = (provider_id) => {
    const additionalSelect = `,
      CASE
        WHEN j.status = 'open' THEN 'Waiting'
        WHEN j.status IN ('accepted', 'completed') AND j.accepted_bid != b.bid_id THEN 'Lost'
        ELSE 'Unknown'
      END AS bid_status`;
    const whereConditions = `
      AND (
        j.status = 'open'
        OR (j.status IN ('accepted', 'completed') AND j.accepted_bid != b.bid_id)
      )`;
    return fetchProviderJobsWithBids(provider_id, additionalSelect, whereConditions);
  };
  
  exports.fetchProviderWonJobs = (provider_id) => {
    const additionalSelect = `,
      CASE
        WHEN j.status = 'accepted' THEN 'Pending'
        WHEN j.status = 'completed' THEN 'Done'
        ELSE 'Unknown'
      END AS job_progress`;
    const whereConditions = `
      AND j.status IN ('accepted', 'completed')
      AND j.accepted_bid = b.bid_id`;
    return fetchProviderJobsWithBids(provider_id, additionalSelect, whereConditions);
  };


  exports.postJob = (jobData) => {
    console.log("Running postJob")
    const queryParams=[
      jobData.summary, 
      jobData.job_detail, 
      jobData.category, 
      jobData.created_by, 
      jobData.photo_url, 
      jobData.target_date, 
    ]
    
    const queryStr=`
    INSERT INTO jobs (
      summary, job_detail, category, created_by, photo_url, target_date, location
    )
    SELECT $1, $2, $3, $4, $5, $6, location
    FROM users
    WHERE user_id = $4
    RETURNING *, ST_AsText(location) AS location_wkt;
  `;

    return db.query(queryStr, queryParams)
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          message: "User not found or no location set",
        });
      }
      return rows[0];
    })
  }

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
              console.log(rows)
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

const db = require("../../db/connection")

exports.fetchJobs = (status, created_by, distance) => {

    // let queryStr = `SELECT * FROM jobs j
    // WHERE ($1::job_status IS NULL OR j.status = $1)
    // AND ($2::integer IS NULL OR j.created_by = $2);`



    let queryStrDistance = `SELECT
    j.job_id,
    j.summary,
    j.category,
    j.status,
    ST_X(j.location) AS job_latitude,
    ST_Y(j.location) AS job_longitude,
    ROUND(
        CAST(ST_Distance(
            j.location::geography,
            (SELECT location::geography FROM users WHERE user_id = $3)
        ) / 1609.34 AS numeric), 2
    ) AS distance_miles
FROM jobs j
WHERE
    j.location IS NOT NULL
    AND ($1::job_status IS NULL OR j.status = $1)
    AND ($2::integer IS NULL OR j.created_by = $2)
    AND (
    $4::float IS NULL OR ST_DWithin(
        j.location::geography,
        (SELECT location::geography FROM users WHERE user_id = $3),
        $4 * 1609.34 -- 50 miles in meters
))
ORDER BY distance_miles;`

    let queryVariables = [status || null, created_by || null, user_id || null, distance || null]

    //         queryStr = `SELECT
    //     j.job_id,
    //     j.summary,
    //     j.category,
    //     j.status,
    //     ST_X(j.location) AS job_latitude,
    //     ST_Y(j.location) AS job_longitude,
    //     ROUND(
    //         CAST(ST_Distance(
    //             j.location::geography,
    //             (SELECT location::geography FROM users WHERE user_id = 1)
    //         ) / 1609.34 AS numeric), 2
    //     ) AS distance_miles
    // FROM jobs j
    // WHERE
    //     j.location IS NOT NULL
    //     AND ST_DWithin(
    //         j.location::geography,
    //         (SELECT location::geography FROM users WHERE user_id = 1),
    //         50 * 1609.34 -- 50 miles in meters
    //     )
    // ORDER BY distance_miles;`
    // //     }


    console.log(queryStrDistance)
    console.log(queryVariables)

    return db.query(queryStrDistance, [...queryVariables])
        .then(({ rows }) => {
            return { jobs: rows }
        })
}
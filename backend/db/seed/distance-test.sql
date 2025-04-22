\c handy_dev

SELECT 
    j.job_id,
    j.summary,
    j.job_detail,
    j.category,
    j.created_by,
    j.photo_url,
    j.target_date,
    j.location,
    ju.postcode AS job_postcode,
    u.postcode AS provider_postcode,
    ST_Distance(
        ST_Transform(j.location, 27700),
        ST_Transform(u.location, 27700)
    ) AS distance_meters
FROM 
    jobs j
JOIN 
    users u ON u.email = 'provider9@manchester.com'
JOIN 
    users ju ON j.created_by = ju.user_id
WHERE 
    j.status = 'open'
    AND ST_DWithin(
        ST_Transform(j.location, 27700),
        ST_Transform(u.location, 27700),
        16093.44  -- 10 miles in meters (1 mile = 1609.344 meters)
    )
ORDER BY 
    distance_meters ASC;
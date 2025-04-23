const db = require("../../db/connection");

exports.postUser = ({
  email,
  password,
  firstname,
  lastname,
  address,
  city,
  postcode,
  about_me,
  avatar_url,
  is_provider,
  latitude,
  longitude
}) => {

  // standardise email to lowercase to prevent login issues
  email = email.toLowerCase();

  return db
    .query(
      `INSERT INTO users
    (email, password, firstname, lastname, address, city, postcode, about_me, avatar_url, is_provider, location)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,ST_SetSRID(ST_MakePoint($11, $12),4326)) RETURNING *, ST_AsText(location) AS location_wkt;`,
      [
        email,
        password,
        firstname,
        lastname,
        address,
        city,
        postcode,
        about_me,
        avatar_url,
        is_provider,
        longitude,
        latitude
      ]
    )
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((error) => {
      if (error.code === '23505') { // PostgreSQL unique violation
        return Promise.reject({
          status: 409,
          message: 'Email address already exists',
          detail: error.detail
        })
      }
    });
};

exports.postLogin = ({ email, password }) => {
    
  return db
    .query(`SELECT * FROM users WHERE LOWER(email) = LOWER($1)`, [email])
    .then(({ rows }) => {
      if (rows.length === 0 || rows[0].password !== password) {
        return Promise.reject({
          status: 401,
          message: "Invalid email or password",
        });
      }
      return rows[0];
    });
};

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
          return rows[0];
      })
}
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
}) => {
  console.log("running postUser");

  return db
    .query(
      `INSERT INTO users
    (email, password, firstname, lastname, address, city, postcode, about_me, avatar_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
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
      ]
    )
    .then(({ rows }) => {
      console.log("Rows returned:", rows);
      return rows[0];
    })
    .catch((error) => {
      // throw error;
      if (err.code === '23505') { // PostgreSQL unique violation
        return response.status(409).send({
          error: 'Conflict',
          message: 'Email address is already registered',
          detail: error.detail
        });
    }});
};

exports.postLogin = ({ email, password }) => {
  return db
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then(({ rows }) => {
      console.log("Rows returned:", rows);
      if (rows.length === 0 || rows[0].password !== password) {
        return Promise.reject({
          status: 401,
          message: "Invalid email or password",
        });
      }
      return rows[0];
    });
};

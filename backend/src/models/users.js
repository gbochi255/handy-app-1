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
  console.log("password:", password);


  return db.query(`INSERT INTO users
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
    ])
    .then(({ rows }) => {
    console.log("Rows returned:", rows);
    return rows[0];
  }).catch((error) =>{
    return error
  })
};

const db = require("../../db/connection");
const format = require("pg-format");

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
  const newUser = format(
    `INSERT INTO users
    (email,password,firstname,lastname,address, city, postcode, about_me, avatar_url)
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
  );

  return db.query(newUser).then(({ rows }) => {
    console.log("Rows returned:", rows);
    return rows;
  });
};

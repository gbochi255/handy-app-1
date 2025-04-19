const db = require("../../db/connection");

exports.checkUserExists = (userId) => {
  return db.query("SELECT user_id FROM users WHERE user_id = $1", [userId])
    .then(({ rows }) => {
      if (rows.length === 0) {
        const error = new Error("User ID not found");
        error.status = 404;
        throw error;
      }
      return Promise.resolve();
    });
};
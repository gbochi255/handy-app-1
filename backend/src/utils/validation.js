const db = require("../../db/connection");

exports.checkUserExists = (userId, checkProvider = false) => {
  const selectFields = checkProvider ? "user_id, is_provider" : "user_id";
  return db.query(`SELECT ${selectFields} FROM users WHERE user_id = $1`, [userId])
    .then(({ rows }) => {
      if (rows.length === 0) {
        const error = new Error("User ID not found");
        error.status = 404;
        throw error;
      }

      if (checkProvider && !rows[0].is_provider) {
        const error = new Error("User is not a provider");
        error.status = 404;
        throw error;
      }

      return Promise.resolve();
    });
};
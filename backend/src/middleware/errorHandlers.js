// backend/src/middleware/errorHandlers.js

function handleDBErrors(error, request, response, next) {
  // 22001: Occurs when a string exceeds maximum length allowed by a column's data type (e.g., VARCHAR(50))
  if (error.code === "22001") {
    return response.status(400).send({
      status: 400,
      message: "Bad request",
      detail: error.message,
    });
  }
  // 22P02: string cannot be converted to expected data type (e.g., "abc" to integer).
  if (error.code === "22P02") {
    return response.status(400).send({
      status: 400,
      message: "Bad request",
      detail: error.message,
    });
  }
  // 23502: NOT NULL column is given a NULL value during insert or update
  if (error.code === "23502") {
    return response.status(400).send({
      status: 400,
      message: "Bad request",
      detail: error.message,
    });
  }
  // 23503: Foreign key constraint violation, such as referencing a non-existent record in another table
  if (error.code === "23503") {
    return response.status(404).send({
      status: 404,
      message: "Not found",
      detail: error.detail,
    });
  }


  // if (err.code === '23505') { // PostgreSQL unique violation
  //   return response.status(409).send({
  //     error: 'Conflict',
  //     message: 'Email address is already registered',
  //     detail: error.detail
  //   })};

  
  next(error);
}

function handleDefaultErrors(error, request, response, next) {
  const status = error.status || 500; // Default to 500 if no status is provided
  response
  .status(status)
  .send({ status: status, message: error.message, detail: error.detail });
}

module.exports = {
  handleDefaultErrors,
  handleDBErrors,
};

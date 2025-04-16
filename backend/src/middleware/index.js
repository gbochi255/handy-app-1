// backend/src/middleware/index.js

const validation = require('./validation');
const errorHandlers = require('./errorHandlers');

module.exports = {
  ...validation,
  ...errorHandlers
};

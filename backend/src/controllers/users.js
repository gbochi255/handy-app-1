const { response } = require("../../app");
const { postUser } = require("../models/users");

exports.registerUser = (request, response, next) => {
  const user = request.body;
  console.log("registerUser:", user);
  postUser(user)
    .then((newUser) => {
      response.status(201).send( newUser );
    })
    .catch((error) => {
      console.log(error);
      next(error)
    });
};

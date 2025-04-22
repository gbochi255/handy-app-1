const { request, response } = require("express");
const { postUser, postLogin, updateProviderStatus } = require("../models/userModel");

exports.createUser = (request, response, next) => {
  const user = request.body;
  postUser(user)
    .then((newUser) => {
      response.status(201).send(newUser);
    })
    .catch(next);
};


exports.loginUser = (request, response, next) => {
  const loginUser = request.body;
  postLogin(loginUser)
    .then((user) => {
      response.status(200).send(user);
    })
    .catch(next);
};

exports.patchProviderStatus = (request, response, next) => {
  const { user_id } = request.params
  const { isProvider } = request.body 
  updateProviderStatus(Number(user_id), isProvider)
  .then((user) => {
      response.status(200).send(user)
  })
  .catch(next)
}
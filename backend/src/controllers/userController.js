const { request, response } = require("express");
const { postUser, postLogin } = require("../models/userModel");

exports.createUser = (request, response, next) => {
  const user = request.body;
  postUser(user)
    .then((newUser) => {
      response.status(201).send(newUser);
    })
    .catch(next);
};

// Login
// connect to /login
// send email and password body
// compare password against db
// if match, return {user_id, firstname, lastname, email, is_provider, avatar_url}
// if no match, return 401

exports.loginUser = (request, response, next) => {
  console.log("Next:", next)
  console.log("login flow");
  const loginUser = request.body;
  postLogin(loginUser)
    .then((user) => {
      response.status(200).send(user);
    })
    .catch(next);
};

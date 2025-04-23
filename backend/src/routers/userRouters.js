const userRouter = require("express").Router();

const { userController } = require("../controllers/index");
const { validateRegistration, validateLogin } = require("../../src/middleware")

userRouter
.route("/register")
.get(validateRegistration)
.get(userController.createUser)

userRouter
.route("/login")
.get(validateLogin)
.get(userController.loginUser)

userRouter
.route("/users/:user_id")
.get(userController.patchProviderStatus)

module.exports = userRouter;

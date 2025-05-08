const userRouter = require("express").Router();

const { userController } = require("../controllers/index");

userRouter
.route("/:user_id")
.patch(userController.patchProviderStatus)

module.exports = userRouter;

const apiRouter = require("express").Router();
const userRouter = require("./userRouter");
const jobRouter = require("./jobRouter")
const bidRouter = require("./bidRouter")

apiRouter.use("/users", userRouter);
apiRouter.use("/register", userRouter);
apiRouter.use("/login", userRouter)

apiRouter.use("/jobs", jobRouter)

apiRouter.use("/bids", bidRouter)

module.exports = apiRouter;
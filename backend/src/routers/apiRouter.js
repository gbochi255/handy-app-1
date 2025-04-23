const apiRouter = require("express").Router();
const userRouter = require("./userRouter");
const jobRouter = require("./jobRouter")
const bidRouter = require("./bidRouter")

// apiRouter.use("/register", userRouter);
// apiRouter.use("/login", userRouter)


apiRouter.use("/bids", bidRouter);

apiRouter.use("/jobs", jobRouter);

apiRouter.use("/users", userRouter);

module.exports = apiRouter;
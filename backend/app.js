const express = require("express");
const app = express();
const { loginUser, createUser, patchProviderStatus } = require("./src/controllers/userController");
const { getJobs, getClientJobs, getProviderJobs, getProviderBids, getProviderWonJobs, postJob, createJob, patchJobComplete, patchBidAccept } = require("./src/controllers/jobController")
const { validateRegistration, validateLogin, handleDefaultErrors, handleDBErrors } = require("./src/middleware");
const baseurl = "";

app.use(express.json());

// Routes with middleware
app.post(`${baseurl}/register`, validateRegistration, createUser);

app.post(`${baseurl}/login`, validateLogin, loginUser);

app.get(`${baseurl}/jobs`, getJobs)

app.get(`${baseurl}/jobs/client`, getClientJobs)

app.get(`${baseurl}/jobs/provider/:provider_id`, getProviderJobs)

app.get(`${baseurl}/jobs/provider/:provider_id/bids`, getProviderBids)

app.get(`${baseurl}/jobs/provider/:provider_id/won`, getProviderWonJobs)

app.post(`${baseurl}/jobs/create`, createJob)

app.patch(`${baseurl}/jobs/:job_id/complete`, patchJobComplete)

app.patch(`${baseurl}/jobs/:job_id/accept/:bid_id`, patchBidAccept)

app.patch(`${baseurl}/users/:user_id`, patchProviderStatus)

// handle invalid routes gracefully
app.use((req, res, next) => {
  const error = new Error('Not Found - The requested resource does not exist');
  error.status = 404;
  next(error); // Pass to error handlers
});

// Error handling middleware
app.use(handleDBErrors); // Handle DB-specific errors first
app.use(handleDefaultErrors); // Handle custom errors (400, 404, etc.)

module.exports = app;

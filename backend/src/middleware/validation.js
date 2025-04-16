// backend/src/middleware/validation.js

// User registration validation
exports.validateRegistration = (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;
  
  // Check required fields
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).send({
      status: 400,
      message: "Missing required fields",
      detail: "Email, password, firstname, and lastname are required"
    });
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send({
      status: 400,
      message: "Invalid email format",
    });
  }
  
  // Validate password strength
  if (password.length < 6) {
    return res.status(400).send({
      status: 400,
      message: "Password too short",
      detail: "Password must be at least 6 characters"
    });
  }
  
  // If all validations pass, proceed to the next middleware/controller
  next();
};

// Login validation
exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).send({
      status: 400,
      message: "Missing credentials",
      detail: "Both email and password are required"
    });
  }
  
  next();
};

const { validationResult } = require("express-validator");

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  return res.status(400).json({
    success: false,
    data: { errors: errors.array() },
    message: errors.array()[0]?.msg || "Validation failed"
  });
};

module.exports = validationMiddleware;

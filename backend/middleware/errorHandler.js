const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      data: {},
      message: err.message
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      data: {},
      message: "Duplicate resource conflict"
    });
  }

  console.error(err);
  return res.status(err.statusCode || 500).json({
    success: false,
    data: {},
    message: err.message || "Internal server error"
  });
};

module.exports = errorHandler;

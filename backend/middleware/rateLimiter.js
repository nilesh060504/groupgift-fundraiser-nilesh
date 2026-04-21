const { RateLimiterMemory } = require("rate-limiter-flexible");

const limiter = new RateLimiterMemory({
  points: 120,
  duration: 60
});

const rateLimiter = async (req, res, next) => {
  try {
    await limiter.consume(req.ip);
    return next();
  } catch {
    return res.status(429).json({
      success: false,
      data: {},
      message: "Too many requests, please try again later"
    });
  }
};

module.exports = rateLimiter;

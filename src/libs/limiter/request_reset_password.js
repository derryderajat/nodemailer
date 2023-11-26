const rateLimit = require("express-rate-limit");
const limit_10s = 10 * 1000;
const limiter = rateLimit({
  windowMs: limit_10s,
  max: 1,
  message: (req) => {
    return {
      status: 429, // Too Many Requests
      message: "Too many requests, please try again later.",
      resetTime: new Date(req.rateLimit.resetTime).toLocaleTimeString(),
    };
  },
});

module.exports = limiter;

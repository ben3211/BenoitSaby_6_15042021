const rateLimit = require('express-rate-limit');


const authLimiter = rateLimit ({
    max: 2,
    windowMs: 2 * 60 * 1000, // 2 min
    message:"You've been blocked, try again in 2 minutes"
});

module.exports = authLimiter;
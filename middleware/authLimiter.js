const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit ({
    max: 2,
    windowMs: 1 * 60 * 1000, // 1 min
    message:"Vous avez été bloqué, réessayé dans 2 minutes"
});

module.exports = authLimiter;
const { rateLimit } = require('express-rate-limit');

exports.limiter = (time, limit) => {
    return (req, res, next) => {
        return rateLimit({
            windowMs: time * 60 * 1000,
            limit: limit,
            standardHeaders: 'draft-8',
            legacyHeaders: false,
        })
    }
}

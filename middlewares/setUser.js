const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    res.locals.user = null;

    if (token) {
        try {
            res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {}
    }
    next();
};

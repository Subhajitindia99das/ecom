const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect("/");

    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (data.role !== "owner") return res.status(403).send("Forbidden");

    req.owner = data;
    next();
};

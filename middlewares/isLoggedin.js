const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.flash("error", "Please login first");
        return res.redirect("/");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;   // { id, email, role }
        next();
    } catch {
        res.cookie("token", "");
        req.flash("error", "Session expired. Login again");
        return res.redirect("/");
    }
};

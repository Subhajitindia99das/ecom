const express = require("express");
const router = express.Router();

const {registerUser, loginUser, logout} = require("../controllers/authcontroller")

router.get("/", (req, res) => {
    res.send("hey we send that")
})

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logout)

module.exports = router;
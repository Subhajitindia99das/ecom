const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("hey we send that")
})

module.exports = router;
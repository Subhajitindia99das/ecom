const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model")

if(process.env.NODE_ENV==="development") {
    router.post("/create", async (req, res) => {
        // res.send("It's working in the create section of owner router")
        let owner = await ownerModel.find();
        if(owner.length > 0) {
            return res
            .status(500)
            .send("You have not the permission to create a owner");
        }

        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        })
        res.status(201).send(createdOwner)
    })
}


router.get('/admin', (req, res) => {
    let success = req.flash("success")
    res.render('createproducts', {success});
});


module.exports = router;
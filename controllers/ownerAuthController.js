// const ownerModel = require("../models/owner-model");
// const bcrypt = require("bcrypt");
// const { generateToken } = require("../utils/generateToken");

// module.exports.loginOwner = async (req, res) => {
//     const { email, password } = req.body;

//     const owner = await ownerModel.findOne({ email });
//     if (!owner) return res.status(403).send("Not allowed");

//     const match = await bcrypt.compare(password, owner.password);
//     if (!match) return res.status(403).send("Not allowed");

//     const token = generateToken({ id: owner._id, role: "owner" });
//     res.cookie("token", token, {
//         httpOnly: true,
//         sameSite: "strict"
//     });

//     res.redirect("/admin");
// };

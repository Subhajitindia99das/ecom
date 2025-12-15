const userModel = require("../models/user-model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const {generateToken} = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try{
        let {fullname, email, password} = req.body;

        let userExist = await userModel.findOne({email: email})
        if(userExist) {
            req.flash("error", "you alrady have an account Plz log in...");
            return res.redirect("/");
        }
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, async (err, hash)=> {
                if(err) return res.send(err.message);
                else {
                    let usercreate = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    })
                    
                    let token = generateToken(usercreate);
                    res.cookie("token", token)
                    res.redirect("/shop")
                }
            })
        })

    }
    catch(err) {
        console.log(err.message);
    }
}


module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            req.flash("error", "Please register first");
            return res.redirect("/");
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                req.flash("error", "Something went wrong");
                return res.redirect("/");
            }

            if (result) {
                const token = generateToken(user);
                res.cookie("token", token);
                return res.redirect("/shop");
            } else {
                req.flash("error", "Invalid email or password");
                return res.redirect("/");
            }
        });

    } catch (err) {
        console.log(err.message);
        req.flash("error", "Server error");
        res.redirect("/");
    }
};



module.exports.logout = async (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
}
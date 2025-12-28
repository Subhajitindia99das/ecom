const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const orderModel = require("../models/order-model");

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedin, async (req, res) => {
    const products = await productModel.find();
    const success = req.flash("success");
    res.render("shop", { products, success });
});

router.get("/cart", isLoggedin, async (req, res) => {

    if (req.user.role !== "user") {
        return res.redirect("/owners/admin");
    }

    const user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");

    let total = 0;
    user.cart.forEach(p => total += p.price);

    res.render("cart", { user, total });
});


router.post("/addtocart/:productid", isLoggedin, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();

    req.flash("success", "Added to cart");
    res.redirect("/shop");
});

router.post("/removefromcart/:id", isLoggedin, async (req, res) => {
    const user = await userModel.findOne({ email: req.user.email });
    user.cart = user.cart.filter(
        p => p.toString() !== req.params.id
    );
    await user.save();
    res.redirect("/cart");
});


router.post("/placeorder", isLoggedin, async (req, res) => {
    const user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");

    if (user.cart.length === 0) {
        req.flash("error", "Cart is empty");
        return res.redirect("/cart");
    }

    let total = 0;
    user.cart.forEach(p => total += p.price);

    const order = await orderModel.create({
        user: user._id,
        products: user.cart,
        totalAmount: total
    });

    user.orders.push(order._id);
    user.cart = []; // clear cart
    await user.save();

    req.flash("success", "Order placed successfully");
    res.redirect("/shop");
});


router.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
});

router.get("/myaccount", isLoggedin, async (req, res) => {
    if (req.user.role !== "user") {
        return res.redirect("/owners/admin");
    }

    const user = await userModel
        .findOne({ email: req.user.email })
        .populate({
            path: "orders",
            populate: { path: "products" }
        });

    res.render("myaccount", { user });
});


module.exports = router;
require("dotenv").config();

const express = require("express");
const router = express.Router();

const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model");
const orderModel = require("../models/order-model");

const ownerAuth = require("../middlewares/ownerAuth");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

// ===============================
// CREATE OWNER (DEV ONLY – ONE TIME)
// ===============================
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      const ownerExists = await ownerModel.find();
      if (ownerExists.length > 0) {
        return res.status(403).send("Owner already exists");
      }

      const { fullname, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdOwner = await ownerModel.create({
        fullname,
        email,
        password: hashedPassword,
      });

      res.status(201).send(createdOwner);
    } catch (err) {
      res.status(500).send("Server error");
    }
  });
}

// ===============================
// OWNER LOGIN
// ===============================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    const owner = await ownerModel.findOne({ email });
    if (!owner) return res.status(401).send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) return res.status(401).send("Invalid credentials");

    const token = generateToken({
      id: owner._id,
      role: "owner",
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.redirect("/owners/admin");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// ===============================
// OWNER LOGIN PAGE
// ===============================
router.get("/login", (req, res) => {
  res.render("owner-login");
});

// ===============================
// ADMIN DASHBOARD
// ===============================
router.get("/admin", ownerAuth, async (req, res) => {
  const success = req.flash("success");
  const products = await productModel.find();
  res.render("createproducts", { success, products });
});

// ===============================
// ADMIN ORDERS
// ===============================
router.get("/orders", ownerAuth, async (req, res) => {
  const orders = await orderModel
    .find()
    .populate("user")
    .populate("products")
    .sort({ createdAt: -1 });

  res.render("admin-orders", { orders });
});

router.post("/orders/:id/status", ownerAuth, async (req, res) => {
  const { status } = req.body;
  await orderModel.findByIdAndUpdate(req.params.id, { status });
  res.redirect("/owners/orders");
});

module.exports = router;
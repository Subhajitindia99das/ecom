const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");
const ownerAuth = require("../middlewares/ownerAuth");

router.post("/create", ownerAuth, upload.single("image"), async (req, res) => {
    try {
      let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

      if (!name || !price) {
          req.flash("error", "Name and price are required");
          return res.redirect("/owners/admin");
      }

      await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
      });

      req.flash("success", "Product created successfully");
      res.redirect("/owners/admin");
    } catch (err) {
      res.send(err.message);
    }
  }
);

// DELETE product (admin only)
router.post("/delete/:id", ownerAuth, async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        req.flash("success", "Product deleted successfully");
        res.redirect("/owners/admin");
    } catch (err) {
        res.send("Error deleting product");
    }
});

// Edit product...
router.get("/edit/:id", ownerAuth, async (req, res) => {
    const product = await productModel.findById(req.params.id);
    res.render("editproduct", { product });
});

router.post("/edit/:id", ownerAuth, async (req, res) => {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    await productModel.findByIdAndUpdate(req.params.id, {
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    });

    req.flash("success", "Product updated");
    res.redirect("/owners/admin");
});


module.exports = router;
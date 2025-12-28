const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    totalAmount: Number,
    status: {
        type: String,
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("order", orderSchema);

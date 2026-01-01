// const mongoose = require("mongoose");
// const dbgr = require("debug")("development:mongoose");

// if (!process.env.MONGODB_URL) {
//     throw new Error("❌ MONGODB_URI is not defined in .env file");
// }

// mongoose
//     .connect(process.env.MONGODB_URL)
//     .then(() => {
//         dbgr("✅ MongoDB connected successfully");
//     })
//     .catch((err) => {
//         console.error("❌ MongoDB connection error:", err);
//     });

// module.exports = mongoose.connection;

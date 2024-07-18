const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    desc: String,
    stock: String,
    price: String,
    category: String,
    userId: String,
    company: String
})

module.exports = mongoose.model("products", productSchema);
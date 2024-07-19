const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: String,
  name: String,
  desc: String,
  price: String,
  category: String,
});

const orderSchema = new mongoose.Schema({
  items: [itemSchema],
  name: String,
  email: String,
  address: String,
  totalproducts: String,
  phone: String,
  total: String,
});

module.exports = mongoose.model("orders", orderSchema);

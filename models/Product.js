const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  heading: String,
  price: Number,
  rating: Number,
  image: String,
  category: String ,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
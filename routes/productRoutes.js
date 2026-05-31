const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 📤 [GET] - सभी प्रोडक्ट्स को फेच करने के लिए
// URL: http://localhost:8080/products
router.get("/products", (req, res) => {
  Product.find()
    .then((data) => {
      res.json({
        success: true,
        data: data,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    });
});

// 📥 [POST] - नया सिंगल प्रोडक्ट जोड़ने के लिए
// URL: http://localhost:8080/products
router.post("/products", (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    category: req.body.category,
    price: req.body.price,
    image: req.body.image,
    rating: req.body.rating,
  });

  newProduct
    .save()
    .then((product) => {
      res.status(201).json({
        success: true,
        message: "Product Added Successfully",
        data: product,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    });
});

// 📝 [PUT] - आईडी के आधार पर प्रोडक्ट एडिट करने के लिए
// URL: http://localhost:8080/products/:id
router.put("/products/:id", (req, res) => {
  const productId = req.params.id;
  
  Product.findByIdAndUpdate(productId, req.body, { new: true, runValidators: true })
    .then((updatedProduct) => {
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      res.json({
        success: true,
        message: "Product Updated Successfully",
        data: updatedProduct,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    });
});

// ❌ [DELETE] - आईडी के आधार पर प्रोडक्ट हटाने के लिए
// URL: http://localhost:8080/products/:id
router.delete("/products/:id", (req, res) => {
  const productId = req.params.id;

  Product.findByIdAndDelete(productId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
      res.json({
        success: true,
        message: "Product Record Deleted",
        data: deletedProduct,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require('passport');
const config = require("../connection/config");
const Product = require("../model/Product");

router.post("/add", passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating
  });
  Product.addProduct(newProduct, (err, suc) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to Add Product",
        data: err
      });
    } else {
      res.json({
        success: true,
        message: "Product Added Successfully"
      });
    }
  });
});

router.get("/get", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  Product.getAllProducts((err, suc) => { 
    if (err) {
      res.json({
        success: false,
        message: "Failed to Fetch Products",
        data: err
      });
    } else {
      res.json({
        success: true,
        message: "Products Fetched Successfully",
        data: suc
      });
    }
  });
});

router.delete("/delete/:id", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  Product.findOneAndRemove(req.params.id, (err, suc) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to Remove Product",
        data: err
      });
    } else {
      res.json({
        success: true,
        message: "Product Removed Successfully"
      });
    }
  });
});

router.put("/edit", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const editProduct = {
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating
  };
  Product.findByIdAndUpdate(req.body.id, editProduct, (err, suc) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to Update Product",
        data: err
      });
    } else {
      res.json({
        success: true,
        message: "Product Updated Successfully"
      });
    }
  });
});

module.exports = router;

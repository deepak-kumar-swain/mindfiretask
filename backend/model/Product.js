const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  rating: { type: String, required: true }
});

const Products = (module.exports = mongoose.model("Products", UserSchema));

module.exports.addProduct = function(newProduct, callback) {
  newProduct.save(callback);
};

module.exports.getProductById = function (id, callback) {
  const query = { _id: id };
  Products.findOne(query, callback);
};

module.exports.getAllProducts = function(callback) {
  Products.find({}, callback);
};

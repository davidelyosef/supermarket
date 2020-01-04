const mongoose = require("mongoose");

// Schema of products + Product model
const productSchema = mongoose.Schema({
    name: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    price: Number,
    img_name: String
}, { versionKey: false });
const Product = mongoose.model("Product", productSchema, "products");

////////////////////////// Functions /////////////////////////////////////////////////////////////////////////

function getAllProducts() {
    return new Promise((res, rej) => {
        Product.find({}).populate("category").exec((err, products) => {
            if (err) return rej(err);
            res(products);
        });
    });
}

function getAllProductsFromOneCategory(_id) {
    return new Promise((res, rej) => {
        Product.find({ category: { _id } }).populate("category").exec((err, products) => {
            if (err) return rej(err);
            res(products);
        });
    });
}

function addProduct(product) {
    return new Promise((res, rej) => {
        const productToAdd = new Product(product);
        productToAdd.save((err, product) => {
            if (err) return rej(err);
            res(product);
        });
    });
}

function getOneProduct(_id) {
    return new Promise((res, rej) => {
        Product.findById(_id, (err, product) => {
            if (err) return rej(err);
            res(product);
        });
    });
}

function updateProduct(product) {
    return new Promise((res, rej) => {
        const newProduct = new Product(product);
        Product.updateOne({ _id: product._id }, newProduct, (err, info) => {
            if (err) return rej(err);
            res(newProduct);
        });
    });
}

function deleteProduct(_id) {
    return new Promise((res, rej) => {
        Product.deleteOne({ _id }, (err, info) => {
            if (err) return rej(err);
            res();
        });
    });
}

module.exports = {
    getAllProducts,
    getAllProductsFromOneCategory,
    getOneProduct,
    deleteProduct,
    updateProduct,
    addProduct
}
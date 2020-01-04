const express = require("express");
const logic = require("../bll/products-logic");

const router = express.Router();

// get all products
router.get("/", async (req, res) => {
    try {
        const products = await logic.getAllProducts();
        res.json(products);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// add product
router.post("/", async (req, res) => {
    try {
        const newProduct = req.body;
        const addedProduct = await logic.addProduct(newProduct);
        res.status(201).json(addedProduct);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get one product
router.get("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        const products = await logic.getOneProduct(id);
        res.json(products);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get all products from one category
router.get("/categories/:category", async (req, res) => {
    try {
        const category = req.params.category;
        const products = await logic.getAllProductsFromOneCategory(category);
        res.json(products);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// update product
router.put("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        const product = req.body;
        product._id = id;
        const newProduct = await logic.updateProduct(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// patch product
router.patch("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        const product = req.body;
        product._id = id;
        const newProduct = await logic.updateProduct(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// delete product
router.delete("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        await logic.deleteProduct(id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
const express = require("express");
const logic = require("../bll/cart-logic");

const router = express.Router();

// get all carts
router.get("/carts", async (req, res) => {
    try {
        const carts = await logic.getAllCarts();
        res.json(carts);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get the cart from the user
router.get("/carts/:_id", async (req, res) => {
    try {
        const user_id = req.params._id;
        const carts = await logic.getCartFromUser(user_id);
        res.json(carts);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get the cart by his id
router.get("/cart/:_id", async (req, res) => {
    try {
        const _id = req.params._id;
        const carts = await logic.getCart(_id);
        res.json(carts);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// add cart
router.post("/carts", async (req, res) => {
    try {
        const newCart = req.body;
        const addedCart = await logic.addCart(newCart);
        res.status(201).json(addedCart);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get all cart items
router.get("/cart_item", async (req, res) => {
    try {
        const items = await logic.getAllCartItems();
        res.json(items);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get one cart item
router.get("/cart_item/:_id", async (req, res) => {
    try {
        const _id = req.params._id;
        const item = await logic.getCartItem(_id);
        res.json(item);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
})

// get all cart items from specific cart
router.get("/cart_item/carts/:_id", async (req, res) => {
    try {
        const cart_id = req.params._id;
        const items = await logic.getCartItemsFromOneCart(cart_id);
        res.json(items);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// delete one cart item
router.delete("/cart_item/:_id", async (req, res) => {
    try {
        const _id = req.params._id;
        await logic.deleteCartItem(_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// delete all cart items from one cart
router.delete("/cart_item/carts/:_id", async (req, res) => {
    try {
        const cart_id = req.params._id;
        await logic.deleteAllItemsFromOneCart(cart_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// delete a cart
router.delete("/cart/:_id", async (req, res) => {
    try {
        const _id = req.params._id;
        await logic.deleteCart(_id);
        res.sendStatus(204);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// add cart item to specific cart
router.post("/cart_item/carts/:_id", async (req, res) => {
    try {
        const newItem = req.body;
        const cart_id = req.params._id;
        const addedItem = await logic.addCartItem(newItem, cart_id);
        res.status(201).json(addedItem);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// update cart item
router.patch("/cart_item/:_id", async (req, res) => {
    try {
        const cart_id = req.params._id;
        const newItem = req.body;
        newItem._id = cart_id;
        const updatedItem = await logic.updateItem(newItem, cart_id);
        res.status(201).json(updatedItem);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
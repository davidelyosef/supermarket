const express = require("express");
const logic = require("../bll/order-logic");

const router = express.Router();

// get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await logic.getAllOrders();
        res.json(orders);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get orders from specific user
router.get("/:_id", async (req, res) => {
    try {
        const _id = req.params._id;
        const orders = await logic.getOrderFromUser(_id);
        res.json(orders);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// add an order
router.post("/", async (req, res) => {
    try {
        const newOrder = req.body;
        const addedOrder = await logic.addOrder(newOrder);
        res.status(201).json(addedOrder);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

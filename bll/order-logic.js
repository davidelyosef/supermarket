const mongoose = require("mongoose");

// Schema of order + Order model
const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    cart: { type: mongoose.Schema.Types.ObjectId, ref: "ShoppingCart" },
    final_price: Number,
    delivery_city: String,
    delivery_street: String,
    delivery_house: Number,
    delivery_date: String,
    cc_number: Number
}, { versionKey: false });
const Order = mongoose.model("Order", orderSchema, "orders");

////////////////////////// Functions /////////////////////////////////////////////////////////////////////////

function getAllOrders() {
    return new Promise((res, rej) => {
        Order.find({}).populate("user").populate("cart").exec((err, orders) => {
            if (err) return rej(err);
            res(orders);
        });
    });
}

function addOrder(order) {
    return new Promise((res, rej) => {
        const orderToAdd = new Order(order);
        orderToAdd.save((err, order) => {
            if (err) return rej(err);
            res(order);
        });
    });
}

function getOrderFromUser(_id) {
    return new Promise((res, rej) => {
        Order.find({ user: { _id } }).populate("user").exec((err, orders) => {
            if (err) return rej(err);
            res(orders);
        });
    });
}

module.exports = {
    getAllOrders,
    addOrder,
    getOrderFromUser
}







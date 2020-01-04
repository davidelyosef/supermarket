const mongoose = require("mongoose");

// Schema of shopping_cart + ShoppingCart model
const shoppingCartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: String
}, { versionKey: false });
const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema, "shopping_cart");

// Schema of cart_item + CartItem model
const cartItemSchema = mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    amount: Number,
    general_price: Number,
    shopping_cart: { type: mongoose.Schema.Types.ObjectId, ref: "ShoppingCart" }
}, { versionKey: false });
const CartItem = mongoose.model("CartItem", cartItemSchema, "cart_item");

////////////////////////// Functions /////////////////////////////////////////////////////////////////////////

function getAllCarts() {
    return new Promise((res, rej) => {
        ShoppingCart.find({}).populate("user").exec((err, carts) => {
            if (err) return rej(err);
            res(carts);
        });
    });
}

function getCart(_id) {
    return new Promise((res, rej) => {
        ShoppingCart.findById(_id, (err, cart) => {
            if (err) return rej(err);
            res(cart);
        });
    });
}

function deleteCart(_id) {
    return new Promise((res, rej) => {
        ShoppingCart.findByIdAndDelete({ _id }, (err, info) => {
            if (err) return rej(err);
            res();
        });
    });
}

function getCartFromUser(_id) {
    return new Promise((res, rej) => {
        ShoppingCart.find({ user: { _id} }).populate("user").exec((err, carts) => {
            if (err) return rej(err);
            res(carts);
        });
    });
}

function addCart(cart) {
    return new Promise((res, rej) => {
        const cartToAdd = new ShoppingCart(cart);
        cartToAdd.save((err, cart) => {
            if (err) return rej(err);
            res(cart);
        });
    });
}

// *
function getAllCartItems() {
    return new Promise((res, rej) => {
        CartItem.find({}).populate("product").populate("shopping_cart").exec((err, items) => {
            if (err) return rej(err);
            res(items);
        });
    });
}

function getCartItemsFromOneCart(_id) {
    return new Promise((res, rej) => {
        CartItem.find({ shopping_cart: { _id } }).populate("shopping_cart").populate("product")
        .exec((err, items) => {
            if (err) return rej(err);
            res(items);
        });
    });
}

function getCartItem(_id) {
    return new Promise((res, rej) => {
        CartItem.findById(_id, (err, item) => {
            if (err) return rej(err);
            res(item);
        });
    });
}

function deleteCartItem(_id) {
    return new Promise((res, rej) => {
        CartItem.findByIdAndDelete({ _id }, (err, info) => {
            if (err) return rej(err);
            res();
        });
    });
}

function deleteAllItemsFromOneCart(cart_id) {
    return new Promise((res, rej) => {
        CartItem.remove({ shopping_cart: { _id: cart_id }}, (err, info) => {
            if (err) return rej(err);
            res();
        });
    });
}

function addCartItem(item, _id) {
    return new Promise((res, rej) => {
        const itemToAdd = new CartItem(item);
        itemToAdd.save({ shopping_cart: { _id }}, (err, item) => {
            if (err) return rej(err);
            res(item);
        });
    });
}

function updateItem(item) {
    return new Promise((res, rej) => {
        const newItem = new CartItem(item);
        CartItem.updateOne({ _id: item._id }, newItem, (err, info) => {
            if (err) return rej(err);
            res(newItem);
        });
    });
}

module.exports = {
    getAllCarts,
    getCartFromUser,
    getAllCartItems,
    addCartItem,
    addCart,
    getCartItem,
    getCartItemsFromOneCart,
    deleteCartItem,
    deleteAllItemsFromOneCart,
    getCart,
    deleteCart,
    updateItem
}
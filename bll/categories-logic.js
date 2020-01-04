const mongoose = require("mongoose");

// Schema of categories + Category model
const categorySchema = mongoose.Schema({
    category: String
}, { versionKey: false });
const Category = mongoose.model("Category", categorySchema, "categories");

////////////////////////// Functions /////////////////////////////////////////////////////////////////////////

function getAllCategories() {
    return new Promise((res, rej) => {
        Category.find({}, (err, categories) => {
            if (err) return rej(err);
            res(categories);
        });
    });
}

function getOneCategory(_id) {
    return new Promise((res, rej) => {
        Category.findById({ _id }, (err, categories) => {
            if (err) return rej(err);
            res(categories);
        });
    });
}

module.exports = {
    getAllCategories,
    getOneCategory
}
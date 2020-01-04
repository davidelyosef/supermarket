const express = require("express");
const logic = require("../bll/categories-logic");

const router = express.Router();

// get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await logic.getAllCategories();
        res.json(categories);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get one category
router.get("/:_id", async (req, res) => {
    try {
        const category_id = req.params._id;
        const categories = await logic.getOneCategory(category_id);
        res.json(categories);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
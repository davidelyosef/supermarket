const express = require("express");
const usersLogic = require("../bll/users-logic");

const router = express.Router();

// get all users
router.get("/", async (req, res) => {
    try {
        const users = await usersLogic.getAllUsers();
        res.json(users);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// add user
router.post("/", async (req, res) => {
    try {
        const newUser = req.body;
        const addedUser = await usersLogic.addUser(newUser);
        res.status(201).json(addedUser);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// get the admin
router.get("/admin", async (req, res) => {
    try {
        const admin = await usersLogic.getAdmin();
        res.json(admin);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
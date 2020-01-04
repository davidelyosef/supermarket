const mongoose = require("mongoose");

// connecting to our DB
mongoose.connect("mongodb://localhost:27017/supermarket", { useNewUrlParser: true, useUnifiedTopology: true },
    (err, mongoClient) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("Wer'e connected to MongoDB: " + mongoClient.name);
    });

// Schema of users + create User model
const userSchema = mongoose.Schema({
    private_name: String,
    last_name: String,
    email: String,
    password: String,
    phone: Number,
    city: String,
    street: String,
    house_number: Number,
}, { versionKey: false });
const User = mongoose.model("User", userSchema, "users");

// Schema of admin + create Admin model
const adminSchema = mongoose.Schema({
    private_name: String,
    last_name: String,
    email: String,
    password: String,
}, { versionKey: false });
const Admin = mongoose.model("Admin", adminSchema, "admin");

////////////////////////// Functions /////////////////////////////////////////////////////////////////////////

function getAllUsers() {
    return new Promise((res, rej) => {
        User.find({}, (err, users) => {
            if (err) return rej(err);
            res(users);
        });
    });
}

function addUser(user) {
    return new Promise((res, rej) => {
        const userToAdd = new User(user);
        userToAdd.save((err, user) => {
            if (err) return rej(err);
            res(user);
        });
    });
}

function getAdmin() {
    return new Promise((res, rej) => {
        Admin.find({}, (err, admin) => {
            if (err) return rej(err);
            res(admin[0]);
        });
    });
}
 
module.exports = {
    getAllUsers,
    addUser,
    getAdmin
}
const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
// import controllers: 
const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const cartController = require("./controllers/cart-controller");
const orderController = require("./controllers/order-controller");
const categoiesController = require("./controllers/categories-controller");
const productsLogic = require("./bll/products-logic");

const cors = require("cors");
const server = express();

// server.use: 
server.use(cors());
server.use(express.json());
server.use("/api/users", usersController);
server.use("/api/products", productsController);
server.use("/api/categories", categoiesController);
server.use("/api", cartController);
server.use("/api/orders", orderController);
server.use(express.static(__dirname));
// add recently
server.use(express.static(__dirname + '/dist'));

let upload = multer({ dest: __dirname + `\\assets\\products` });
// upload the image and the new product
server.post("/upload-image", upload.single("myImage"), (request, response) => {

    let newObj = JSON.parse(request.body.newProduct);
    const fileExtension = path.extname(request.file.originalname);
    const multerFilename = request.file.destination + "\\" + request.file.filename;
    const finalFileName = multerFilename + fileExtension;

    // Rename multer file name to contain the original extension: 
    fs.rename(multerFilename, finalFileName, err => {
        if (err) {
            response.status(500).json(err);
            return;
        }
        response.send("Done.");
    });

    try {
        newObj.img_name = request.file.filename + fileExtension;
        productsLogic.addProduct(newObj);
    }
    catch (err) {
        console.error(err);
    }
});

// update the image
server.patch('/update-image-name', upload.single("myImage"), (req, res) => {
    const fileExtension = path.extname(req.file.originalname);
    const multerFilename = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFilename + fileExtension;

    // Rename multer file name to contain the original extension: 
    fs.rename(multerFilename, finalFileName, err => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.send("Done.");
    });

    try {
        const newImg = { _id: req.body.product_id, img_name: req.file.filename + fileExtension };
        productsLogic.updateProduct(newImg);
        fs.unlinkSync(`${__dirname}\\assets\\products\\${req.body.theProduct}`);
    }
    catch (err) {
        console.error(err);
    }
});

// add recently
server.all("*", (req, res) => {
    res.status(200).sendFile(__dirname + '/dist/index.html');
});

server.listen(process.env.PORT || 8080, () => console.log("Listening..."));
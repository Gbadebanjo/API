"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.makeAdmin = void 0;
const user_1 = __importDefault(require("../model/user"));
const dotenv_1 = require("dotenv");
const product_1 = __importDefault(require("../model/product"));
(0, dotenv_1.config)(); // Load environment variables from .env file
function makeAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            const existingUser = yield user_1.default.findOne({ email: email });
            if (!existingUser) {
                return res.status(409).json({ message: "User does not exist" });
            }
            if (existingUser.admin) {
                return res.status(409).json({ message: "User is already an admin" });
            }
            existingUser.admin = true;
            yield existingUser.save();
            return res.json({ message: "User is now an admin" });
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({
                message: "Internal server error",
                error: err,
            });
        }
    });
}
exports.makeAdmin = makeAdmin;
function addProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, price, description, imageUrls } = req.body;
        if (!name || !price || !description || !imageUrls) {
            return res.status(400).json({ error: 'Missing product details' });
        }
        console.log(imageUrls);
        const picture = JSON.parse(imageUrls);
        const newProduct = new product_1.default({
            name,
            description,
            price,
            picture,
        });
        try {
            yield newProduct.save();
            res.status(201).json({ message: 'Product added successfully', product: newProduct });
        }
        catch (error) {
            console.error(error.message);
            console.error(error.stack);
            res.status(500).json({ error: 'Error adding product' });
        }
    });
}
exports.addProduct = addProduct;
;

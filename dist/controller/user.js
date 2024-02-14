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
exports.getProductbyId = exports.getProducts = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../model/user"));
const dotenv_1 = require("dotenv");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utility/jwt");
const product_1 = __importDefault(require("../model/product"));
(0, dotenv_1.config)(); // Load environment variables from .env file
const salt = process.env.SALT || "";
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const userInput = req.body;
            if (!userInput.email) {
                return res.status(400).json({ message: "Email is required" });
            }
            userInput.email = userInput.email.toLowerCase().trim();
            // Validate email format
            const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            if (!emailRegex.test(userInput.email)) {
                return res.status(400).json({ message: "Invalid email format." });
            }
            const existingUser = yield user_1.default.findOne({ email: userInput.email });
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" });
            }
            const password = yield bcryptjs_1.default.hash(userInput.password, parseInt(salt));
            const user = new user_1.default({
                name: userInput.name,
                email: userInput.email,
                password: password,
            });
            yield user.save();
            const currentUser = {
                user: user._id.toString(),
                admin: user.admin,
                email: user.email,
                verifiedEmail: user.verifiedEmail,
                name: user.name,
            };
            req.user = currentUser;
            const token = (0, jwt_1.generateToken)(currentUser);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24, // cookie will expire after 24 hours
            });
            req.headers.authorization = `Bearer ${token}`;
            return res.json({ token });
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
exports.register = register;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userInput = req.body;
            if (!userInput.email) {
                return res.status(400).json({ message: "Email is required" });
            }
            userInput.email = userInput.email.toLowerCase().trim();
            const user = yield user_1.default.findOne({ email: userInput.email });
            if (!user) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            const isPasswordValid = yield bcryptjs_1.default.compare(userInput.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            const currentUser = {
                user: user._id.toString(),
                admin: user.admin,
                email: user.email,
                verifiedEmail: user.verifiedEmail, // Update the type definition of 'user' to include the 'verifiedEmail' property
                name: user.name,
            };
            req.user = currentUser;
            const token = (0, jwt_1.generateToken)(currentUser);
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24, // cookie will expire after 24 hours
            });
            req.headers.authorization = `Bearer ${token}`;
            return res.json({ token });
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
exports.login = login;
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Fetching products...");
        try {
            const products = yield product_1.default.find();
            res.json(products);
        }
        catch (error) {
            // console.error(error);
            return res.status(500).json({
                message: "Internal server error",
                error: error,
            });
        }
    });
}
exports.getProducts = getProducts;
function getProductbyId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield product_1.default.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        }
        catch (error) {
            // console.error(error);
            return res.status(500).json({
                message: "Internal server error",
                error: error,
            });
        }
    });
}
exports.getProductbyId = getProductbyId;

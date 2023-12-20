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
exports.signup = void 0;
const user_1 = __importDefault(require("../model/user"));
const dotenv_1 = require("dotenv");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
(0, dotenv_1.config)(); // Load environment variables from .env file
const salt = process.env.SALT || "";
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userInput = req.body;
            userInput.email = userInput.email.toLowerCase().trim();
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
            return res.status(201).json({ message: "User created successfully" });
        }
        finally {
        }
    });
}
exports.signup = signup;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const secret = process.env.JWT_SECRET || '';
const expiresIn = process.env.JWT_EXPIRES || '';
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        return payload ? payload : false;
    }
    catch (err) {
        return false;
    }
};
exports.verifyToken = verifyToken;

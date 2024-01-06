"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controller/admin");
const cloudinary_1 = require("../utility/cloudinary");
const router = express_1.default.Router();
router.post('/make-admin', admin_1.makeAdmin);
router.post('/add-product', cloudinary_1.parser.single('image'), admin_1.addProduct);
exports.default = router;

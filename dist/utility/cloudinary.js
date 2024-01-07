"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = void 0;
const express_1 = __importDefault(require("express"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
const dotenv_1 = require("dotenv");
const cloudinaryApp = (0, express_1.default)();
(0, dotenv_1.config)();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        public_id: (req, file) => 'ObaSoles/' + file.originalname,
    },
});
exports.parser = (0, multer_1.default)({ storage: storage });
cloudinaryApp.post('/upload', exports.parser.single('image'), (req, res) => {
    if (req.file) {
        res.json({ imageUrl: req.file.path });
    }
    else {
        res.status(400).json({ error: 'No file uploaded' });
    }
});
exports.default = cloudinaryApp;

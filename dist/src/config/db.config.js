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
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
(0, dotenv_1.config)(); // Load environment variables from .env file
const URI = process.env.MONGO_URL || "";
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!URI) {
                throw new Error("MongoDB connection string is not defined.");
            }
            const connection = mongoose_1.default.connect(URI);
            console.log("Db connected");
            return connection;
        }
        catch (err) {
            console.error(`db connection failed`);
            console.error(err);
        }
    });
}
exports.default = connectDB;

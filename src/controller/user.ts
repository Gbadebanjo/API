import User from "../model/user";
import { config } from "dotenv";
import { Response } from "express";
import { Request } from "../config/type.custom";
import bcrypt from "bcryptjs";

config(); // Load environment variables from .env file

const salt = process.env.SALT || "";

export async function signup(req: Request, res: Response) {
    try {
        const userInput = req.body;
        userInput.email = userInput.email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: userInput.email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const password = await bcrypt.hash(userInput.password, parseInt(salt));
        const user = new User({
            name: userInput.name,
            email: userInput.email,
            password: password,
        });
        await user.save();
        return res.status(201).json({ message: "User created successfully" });

        
}

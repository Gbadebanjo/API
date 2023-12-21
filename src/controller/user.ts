import User from "../model/user";
import { config } from "dotenv";
import { Response } from "express";
import { Request } from "../config/type.custom";
import bcrypt from "bcryptjs";
import { generateToken } from "../utility/jwt";

config(); // Load environment variables from .env file

const salt = process.env.SALT || "";

export async function register(req: Request, res: Response) {
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
    // return res.status(201).json({ message: "User created successfully" });
    const currentUser = {
      user: user._id.toString(),
      admin: user.admin,
      email: user.email,
      verifiedEmail: true, // Add the verifiedEmail property and set it to true
    };
    req.user = currentUser;
    const token = generateToken(currentUser);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // cookie will expire after 24 hours
    });
    req.headers.authorization = `Bearer ${token}`;
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
}

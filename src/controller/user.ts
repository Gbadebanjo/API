import User from "../model/user";
import { config } from "dotenv";
import { Response } from "express";
import { Request } from "../config/type.custom";
import bcrypt from "bcryptjs";
import { generateToken } from "../utility/jwt";
import { IUser } from "../model/user"; // Import the IUser interface
import Product from '../model/product';

config(); // Load environment variables from .env file

const salt = process.env.SALT || "";

export async function register(req: Request, res: Response) {
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
    const currentUser = {
      user: user._id.toString(),
      admin: user.admin,
      email: user.email,
      verifiedEmail: (user as IUser).verifiedEmail,
      name: user.name,
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
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const userInput = req.body;
    if (!userInput.email) {
      return res.status(400).json({ message: "Email is required" });
    }
    userInput.email = userInput.email.toLowerCase().trim();
    const user = await User.findOne({ email: userInput.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(
      userInput.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const currentUser = {
      user: user._id.toString(),
      admin: user.admin,
      email: user.email,
      verifiedEmail: (user as IUser).verifiedEmail, // Update the type definition of 'user' to include the 'verifiedEmail' property
      name: user.name,
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
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
}

export async function getProducts(req: Request, res: Response) {
try {
  const products = await Product.find();
  res.json(products);
} catch (error) {
console.error(error);
return res.status(500).json({
  message: "Internal server error",
  error: error,
});
}
}

import User from "../model/user";
import { config } from "dotenv";
import { Response } from "express";
import { Request } from "../config/type.custom";


config(); // Load environment variables from .env file

export async function makeAdmin(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(409).json({ message: "User does not exist" });
    }
    if (existingUser.admin) {
      return res.status(409).json({ message: "User is already an admin" });
    }
    existingUser.admin = true;
    await existingUser.save();
    return res.json({ message: "User is now an admin" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
}
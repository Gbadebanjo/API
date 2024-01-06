import User from "../model/user";
import { config } from "dotenv";
import { Response } from "express";
import { Request } from "../config/type.custom";
import Product, { IProduct } from "../model/product";


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

export async function addProduct(req: Request, res: Response) {

  const { name, price, description, imageUrls} = req.body;

  if (!name || !price || !description || !imageUrls) {
    return res.status(400).json({ error: 'Missing product details' });
  }

  console.log(imageUrls);
  const picture = JSON.parse(imageUrls);

  const newProduct: IProduct = new Product({
    name,
    description,
    price,
    picture,
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error(error.message);
  console.error(error.stack);
    res.status(500).json({ error: 'Error adding product' });
  }

};
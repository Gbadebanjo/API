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

  const { name, price, description } = req.body;

  if (!name || !price || !description || !req.file) {
    return res.status(400).json({ error: 'Missing product details' });
  }

  const picture = req.file.path;

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
    console.error((error as Error).message);
    console.error((error as Error).stack);
    res.status(500).json({ error: 'Error adding product' });
  }

};

async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error((error as Error).message);
    console.error((error as Error).stack);
    res.status(500).json({ error: 'Error deleting product' });
  }
}

async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const picture = req.file.path;
  try {
    await Product.findByIdAndUpdate(id, { name, price, description, picture });
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error((error as Error).message);
    console.error((error as Error).stack);
    res.status(500).json({ error: 'Error updating product' });
  }
}
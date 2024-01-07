import express, { Request } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer, { Multer } from "multer";
import { config } from "dotenv";

const cloudinaryApp = express();
config(); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      public_id: (req: Request, file: Express.Multer.File) => 'ObaSoles/' + file.originalname,
    },
  });
  
  export const parser = multer({ storage: storage });
  
  cloudinaryApp.post('/upload', parser.single('image'), (req: Request, res) => {
    if (req.file) {
      res.json({ imageUrl: req.file.path });
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  });

  export default cloudinaryApp;
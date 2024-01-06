import express, { Request } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer, { Multer } from "multer";

const cloudinaryApp = express();

cloudinary.config({
  cloud_name: 'dlvcjqk62',
  api_key: '252523352651129',
  api_secret: '14zIsY1TXFnsrrnj8dwt2TjkkuI'
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
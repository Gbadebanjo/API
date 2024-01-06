import express from 'express';
import { makeAdmin, addProduct  } from '../controller/admin';
import  { parser } from '../utility/cloudinary';

const router = express.Router();

router.post('/make-admin', makeAdmin);

router.post('/add-product', parser.single('image'), addProduct);

export default router;
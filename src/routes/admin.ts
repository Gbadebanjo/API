import express from 'express';
import { makeAdmin } from '../controller/admin';
const router = express.Router();

router.post('/make-admin', makeAdmin);

export default router;
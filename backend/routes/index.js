import { Router } from "express";
import productController from "../controllers/product.controller.js";
import validationMiddleware from "../middlewares/validation.middleware.js"
// import upload from "../middlewares/upload.js"
// import googleUploadFiles from "../middlewares/google.upload.js"

import multer from "multer";
const upload = multer();

import fileController from '../controllers/file.controller.js';

const router = new Router();

router.get('/', productController.getProducts);
router.get('/post/:id', productController.getByProduct);
router.post('/post', fileController.uploadFile, productController.createProduct);
router.put('/post/:id', validationMiddleware, productController.updateProduct);
router.delete('/post/:id', productController.deleteProduct);

export default router;
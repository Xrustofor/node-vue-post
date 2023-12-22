import { Router } from "express";
import productController from "../controllers/product.controller.js";
import validationMiddleware from "../middlewares/validation.middleware.js"
import upload from "../middlewares/upload.js"

const router = new Router();

router.get('/', productController.getProducts);
router.get('/post/:id', productController.getByProduct);
router.post('/post', upload, validationMiddleware, productController.createProduct);
router.put('/post/:id', upload, validationMiddleware, productController.updateProduct);
router.delete('/post/:id', productController.deleteProduct);

export default router;
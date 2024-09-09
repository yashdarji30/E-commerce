import express from "express";
import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getFeaturedProducts,
	getProductsByCategory,
	getRecommendedProducts,
	toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protechRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protechRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protechRoute, adminRoute, createProduct);
router.patch("/:id", protechRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protechRoute, adminRoute, deleteProduct);

export default router;
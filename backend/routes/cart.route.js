import express from "express";
import {
  getCartProducts,
  addToCart,
  removeAllFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";
import { protechRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protechRoute, getCartProducts);
router.post("/", protechRoute, addToCart);
router.delete("/", protechRoute, removeAllFromCart);
router.put("/:id", protechRoute, updateQuantity);

export default router;

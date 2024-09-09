import express from "express";
import { protechRoute } from "../middleware/auth.middleware.js";
import {
  checkoutSuccess,
  createCheckoutSession,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protechRoute, createCheckoutSession);
router.post("/checkout-success", protechRoute, checkoutSuccess);

export default router;

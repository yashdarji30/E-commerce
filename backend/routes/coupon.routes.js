import express from "express";
import { protechRoute } from "../middleware/auth.middleware.js";
import {getCoupon,validateCoupon} from "../controllers/coupon.controller.js"
const router = express.Router();

router.get("/", protechRoute,getCoupon);
router.post("/validate",protechRoute,validateCoupon);

export default router
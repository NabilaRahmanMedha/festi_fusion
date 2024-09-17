import express from "express";
import adminAuthController from "../controllers/adminAuthController.js"

const router = express.Router();

router.get('/admin', adminAuthController);

export default router;

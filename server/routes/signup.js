import express from "express";
import { signupController } from "../controllers/signupController.js";

const router = express.Router();

// POST request handler
router.post("/", signupController);

export default router
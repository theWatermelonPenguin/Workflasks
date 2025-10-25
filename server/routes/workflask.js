import express from "express";
import { workflaskController } from "../controllers/workflaskController.js";

const router = express.Router();


router.post("/", workflaskController);

export default router
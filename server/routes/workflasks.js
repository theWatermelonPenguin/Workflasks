import express from "express";
import { workflasksController } from "../controllers/workflasksController.js";

const router = express.Router();


router.get("/", workflasksController);

export default router
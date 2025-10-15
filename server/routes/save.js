import express from "express"
import { saveController } from "../controllers/saveController.js"

const router = express.Router()

router.post("/", saveController)

export default router

//wasdw@gasd
//123456
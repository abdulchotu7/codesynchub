import express from "express";
import { putController, getController, displayController } from "../controllers/cpController.js";

const router = express.Router();

router.post("/fill", putController);
router.get("/user/:u_name", getController);
router.get("/display/:u_name", displayController);

export default router;

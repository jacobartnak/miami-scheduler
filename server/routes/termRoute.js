import express from "express";
import { getAllTerms, updateTerms } from "../controller/termController.js";

const router = express.Router();
router.get("/getAll", getAllTerms);
router.post("/update", updateTerms);

export default router;

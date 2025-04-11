import express from "express";
import { getAllCampuses } from "../controller/campusController.js";

const router = express.Router();
router.get("/getAll", getAllCampuses);
export default router;

import express from "express";
import {
  getAllCourses,
  updateCourses,
} from "../controller/courseController.js";

const router = express.Router();
router.get("/getAll", getAllCourses);
router.post("/update", updateCourses);

export default router;

import express from "express";
import { get } from "../controller/campusController.js";

const route = express.Router();
route.get("/getAll", get);
export default route;

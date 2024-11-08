import express from "express";
import { get } from "../controller/termController.js";

const route = express.Router();
route.get("/getAllTerms", get);

export default route;

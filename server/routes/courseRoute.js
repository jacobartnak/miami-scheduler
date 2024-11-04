import express from "express";
import {
  fetch,
  create,
  update,
  deleteUser,
} from "../controller/courseController.js";

const route = express.Router();
route.post("/create", create);
route.get("/getAllCourses", fetch);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);

export default route;

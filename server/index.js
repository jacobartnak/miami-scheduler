// index.js

// Load environment variables

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import courseRoute from "./routes/courseRoute.js";
import termRoute from "./routes/termRoute.js";
import campusRoute from "./routes/campusRoute.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
// MongoDB connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Basic Middleware
app.use(express.json()); // to parse JSON bodies
app.use(cors());
// // Sample route for testing
// app.get("/getCourses", async (req, res) => {
//   const userData = await User.find();
//   res.json(userData);
//   //res.send('Hello World');
// });

app.use("/api/courses", courseRoute);
app.use("/api/terms", termRoute);
app.use("/api/campuses", campusRoute);

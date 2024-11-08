import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  Id: String,
  Name: String,
});

export default mongoose.model("campuses", Schema);

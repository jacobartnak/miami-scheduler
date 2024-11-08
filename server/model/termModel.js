import mongoose from "mongoose";

const TermSchema = new mongoose.Schema({
  Id: String,
  Name: String,
});

export default mongoose.model("terms", TermSchema);

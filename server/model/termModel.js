import mongoose from "mongoose";

const termSchema = new mongoose.Schema({
  Id: {
    type: String,
    required: true,
    unique: true,
  },
  Name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Term", termSchema);

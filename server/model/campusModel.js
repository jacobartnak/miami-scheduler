import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    Id: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
  },
  { collection: "campuses" }
);

export default mongoose.model("Campus", Schema);

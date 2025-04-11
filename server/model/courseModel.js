// Define your schemas and models
import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  CRN: {
    type: String,
    required: true,
  },
  Section: String,
  "Meeting Days": String,
  "Meeting Times": String,
  "Meeting Locations": String,
  Instructors: String,
  MaxSeats: Number,
  AvailableSeats: Number,
});

const courseSchema = new mongoose.Schema(
  {
    Term: {
      type: String,
      required: true,
    },
    Subject: {
      type: String,
      required: true,
    },
    Number: {
      type: String,
      required: true,
    },
    Title: String,
    Campus: String,
    "Credit Hours": Number,
    Description: String,
    Sections: [sectionSchema],
  },
  {
    timestamps: true,
    indexes: [{ Term: 1, Subject: 1, Number: 1, Campus: 1 }],
  }
);

export default mongoose.model("Course", courseSchema);

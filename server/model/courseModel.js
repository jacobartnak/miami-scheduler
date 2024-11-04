// Define your schemas and models
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  Term: String,
  Subject: String,
  Number: String,
  Title: String,
  "Credit Hours": String,
  Description: String,
  Sections: [
    {
      CRN: String,
      Section: String,
      Campus: String,
      "Meeting Days": String,
      "Meeting Times": String,
      "Meeting Locations": String,
      Instructors: String,
    },
  ],
});

export default mongoose.model("courses", CourseSchema);

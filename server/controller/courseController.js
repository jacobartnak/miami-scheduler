import Course from "../model/courseModel.js";

import {
  fetchCustomTerms,
  fetchAllSections,
  buildCoursesFromSections,
} from "../services/miamiApi.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourses = async (req, res) => {
  try {
    const terms = await fetchCustomTerms(null, null, true); // 2 in the future, 1 in the past
    const sections = await fetchAllSections(terms);
    const courses = buildCoursesFromSections(sections);

    if (courses.length == 0) {
      res.status(500).json({ error: "No courses found" });
      return;
    }

    const result = await Course.deleteMany();
    const coursesNew = await Course.create(courses);

    res.status(201).json({
      message: "Courses updated successfully!",
    });
    //const result = await Course.insertMany();
  } catch (err) {
    console.log("Error updating courses: ", err);
    res.status(500).json({ error: err.message });
  }
};

// export const updateCourses = async (req, res) => {
//   try {
//     const { termId } = req.params;

//     // Fetch sections from Miami API
//     const sections = await fetchAllSections([termId]);
//     const coursesData = buildCoursesFromSections(sections);

//     // Put bulk operations now
//     if (operations.length === 0) {
//       return res.json({ message: "No courses to update" });
//     }

//     // Execute bulk write
//     const result = await Course.bulkWrite(operations);

//     res.json({
//       message: "Courses updated successfully",
//       modified: result.modifiedCount,
//       upserted: result.upsertedCount,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const create = async (req, res) => {
//   try {
//     const courseData = new Course(req.body);
//     const { Subject, Number } = courseData;
//     const courseExist = await Course.findOne({
//       Subject: Subject,
//       Number: Number,
//     });
//     if (courseExist) {
//       return res.status(400).json({ message: "Course already exists." });
//     }

//     const savedCourse = await courseData.save();
//     // res.status(200).json(savedCourse);
//     res.status(200).json({ message: "Course created successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server error." });
//   }
// };

// export const update = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const courseExist = await Course.findOne({ _id: id });

//     if (!courseExist) {
//       return res.status(404).json({ message: "Course Not Found" });
//     }

//     const updateCourse = await Course.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.status(201).json(updateCourse);
//   } catch {
//     res.status(500).json({ error: "Internal Server error." });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const courseExist = await Course.findById({ _id: id });

//     if (!courseExist) {
//       return res.status(404).json({ message: " Course Not Found" });
//     }

//     await Course.findByIdAndDelete(id);

//     return res.status(201).json({ message: "User Successfully Deleted" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server error." });
//   }
// };

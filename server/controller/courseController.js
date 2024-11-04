import Course from "../model/courseModel.js";

export const create = async (req, res) => {
  try {
    const courseData = new Course(req.body);
    const { Subject, Number } = courseData;
    const courseExist = await Course.findOne({
      Subject: Subject,
      Number: Number,
    });
    if (courseExist) {
      return res.status(400).json({ message: "Course already exists." });
    }

    const savedCourse = await courseData.save();
    // res.status(200).json(savedCourse);
    res.status(200).json({ message: "Course created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

export const fetch = async (req, res) => {
  try {
    const courses = await Course.find();
    if (courses.length === 0) {
      // 0 courses
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const courseExist = await Course.findOne({ _id: id });

    if (!courseExist) {
      return res.status(404).json({ message: "Course Not Found" });
    }

    const updateCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(updateCourse);
  } catch {
    res.status(500).json({ error: "Internal Server error." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const courseExist = await Course.findById({ _id: id });

    if (!courseExist) {
      return res.status(404).json({ message: " Course Not Found" });
    }

    await Course.findByIdAndDelete(id);

    return res.status(201).json({ message: "User Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

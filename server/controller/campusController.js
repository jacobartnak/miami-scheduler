import Campus from "../model/campusModel.js";

export const get = async (req, res) => {
  try {
    const campuses = await Campus.find({});
    if (campuses.length === 0) {
      // 0 courses
      return res.status(404).json({ message: "Campuses Not Found" });
    }

    res.status(200).json(campuses);
  } catch {
    res.status(500).json({ message: "Interal server error" });
  }
};

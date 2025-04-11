import Campus from "../model/campusModel.js";

export const getAllCampuses = async (req, res) => {
  try {
    const campuses = await Campus.find();
    res.status(200).json(campuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCampus = async (req, res) => {
  try {
    const campus = new Campus(req.body);
    await campus.save();
    res.status(201).json(campus);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

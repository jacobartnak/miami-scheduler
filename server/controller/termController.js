import Term from "../model/termModel.js";

export const get = async (req, res) => {
  try {
    const terms = await Term.find({});
    if (terms.length === 0) {
      // 0 courses
      return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json(terms);
  } catch {
    res.status(500).json({ message: "Interal server error" });
  }
};

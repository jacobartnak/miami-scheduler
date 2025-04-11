import Term from "../model/termModel.js";
import { fetchCustomTerms } from "../services/miamiApi.js";
export const getAllTerms = async (req, res) => {
  try {
    const terms = await Term.find().sort({ termId: -1 });
    res.json(terms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTerms = async (req, res) => {
  try {
    const terms = await fetchCustomTerms();

    if (terms.length == 0) {
      res.status(500).json({ message: "Error fetching terms, no terms found" });
      return;
    }

    const toAdd = terms.map((termData) => {
      return {
        Id: termData.termId,
        Name: termData.name,
      };
    });
    const result = await Term.deleteMany();
    const termsNew = await Term.create(toAdd);
    res.status(201).json({
      message: "Successfully updated terms",
    });
  } catch (err) {
    console.log("Error updating terms: ", err);
  }
};

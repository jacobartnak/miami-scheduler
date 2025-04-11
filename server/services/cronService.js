// server/services/cronService.js
import cron from "node-cron";
import Course from "../model/courseModel.js";
import Term from "../model/termModel.js";
import {
  fetchCustomTerms,
  fetchAllSections,
  buildCoursesFromSections,
} from "./miamiApi.js";

// Function to update database
async function updateDatabase() {
  try {
    console.log("Starting database update:", new Date().toISOString());

    // Courses
    let terms = await fetchCustomTerms(undefined, undefined, true);

    if (terms.length === 0) {
      throw new Error("Error fetching terms, no terms found");
    }

    const sections = await fetchAllSections(terms);
    const courses = buildCoursesFromSections(sections);

    if (courses.length === 0) {
      throw new Error("No courses found");
    }

    await Course.deleteMany();
    let result = await Course.create(courses);

    // Terms

    terms = await fetchCustomTerms(undefined, undefined, false);
    const toAdd = terms.map((termData) => {
      return {
        Id: termData.termId,
        Name: termData.name,
      };
    });

    result = await Term.deleteMany();
    const termsNew = await Term.create(toAdd);

    console.log("Update completed:", new Date().toISOString());
    console.log(`Updated ${result.length} courses`);
  } catch (error) {
    console.error("Update failed:", error);
  }
}

// Schedule formats:
// '0 0 * * *'  = Every day at midnight
// '0 0 * * 0'  = Every Sunday at midnight
// '0 */12 * * *' = Every 12 hours
// '0 0 1 * *'  = First day of each month

export function startCronJobs() {
  // Run every 10 minutes
  console.log("Running scheduled update");
  updateDatabase();
  cron.schedule(
    "*/10 * * * *",
    () => {
      console.log("Running scheduled update");
      updateDatabase();
    },
    {
      timezone: "America/New_York", // Adjust to your timezone
    }
  );

  // Optional: Run immediately when server starts
  // updateDatabase();
}

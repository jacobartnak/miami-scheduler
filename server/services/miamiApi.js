import axios from "axios";
import subjects from "../constants/subjects.js";
import { militaryToStandard } from "../utils/utils.js";
import { MIAMI_API_CONFIG } from "../config/apiConfig.js";
const BASE_URL = MIAMI_API_CONFIG.BASE_URL;

const makeRequest = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: params,
    });
    return response.data.data;
  } catch (error) {
    console.error(`Error while making request to Miami API: ${error}`);
  }
};

export const fetchCustomTerms = async (future = 2, past = 1, array = false) => {
  try {
    const data = await makeRequest(MIAMI_API_CONFIG.ENDPOINTS.TERMS, {
      numOfFutureTerms: String(future),
      numOfPastTerms: String(past),
    });

    if (!data || !Array.isArray(data)) {
      console.error("Invalid data received:", data);
      return [];
    }

    if (array) {
      return data.map((termData) => String(termData?.termId || ""));
    }
    return data;
  } catch (error) {
    console.error("Error in fetch CustomTerms:", error);
    return [];
  }
};

// Follow pages
// Splitting requests by subject is much faster
export const fetchSectionsBySubject = async (url, sections, params) => {
  try {
    const res = await axios.get(url, params);
    const data = res.data;

    for (const sectionData of data.data) {
      if (!sectionData) continue;
      if (!sectionData.termCode) continue;
      if (!sectionData.crn) continue;
      if (!sectionData.campusName) continue;
      if (!sectionData.course) continue;
      if (!sectionData.course.title) continue;

      let meetingDays = "";
      let meetingTimes = "";
      let meetingLocations = "";
      let instructors = "";
      let hasValidSchedule = false;

      for (const obj of sectionData.schedules) {
        if (obj.scheduleTypeCode !== "CLAS") {
          continue;
        }

        if (obj.days && obj.startTime && obj.endTime) {
          hasValidSchedule = true;
          meetingDays += `${obj.days}|`;
          meetingTimes += `${militaryToStandard(
            obj.startTime
          )}-${militaryToStandard(obj.endTime)}|`;

          if (obj.buildingCode && obj.roomNumber) {
            meetingLocations += `${obj.buildingCode} ${obj.roomNumber}|`;
          } else {
            meetingLocations += "TBA|";
          }
        }
      }

      if (!hasValidSchedule) {
        continue;
      }
      // Removing trailing "|", which separates entries
      meetingDays = meetingDays.slice(0, -1);
      meetingTimes = meetingTimes.slice(0, -1);
      meetingLocations = meetingLocations.slice(0, -1);

      for (const obj of sectionData.instructors) {
        if (
          obj.isPrimary === true &&
          obj.person &&
          obj.person.lastName &&
          obj.person.firstName
        ) {
          instructors = `${obj.person.lastName}, ${obj.person.firstName}`;
        }
      }

      const section = {
        Section: {
          CRN: sectionData.crn,
          Section: sectionData.courseSectionCode,
          ["Meeting Days"]: meetingDays,
          ["Meeting Times"]: meetingTimes,
          ["Meeting Locations"]: meetingLocations,
          Instructors: instructors,
          MaxSeats: sectionData.enrollmentCount.numberOfMax,
          AvailableSeats: sectionData.enrollmentCount.numberOfAvailable,
        },

        Course: {
          Term: sectionData.termCode,
          Subject: sectionData.course.subjectCode,
          Number: sectionData.course.number,
          Title: sectionData.course.title,
          Campus: sectionData.campusName,
          ["Credit Hours"]: sectionData.course.creditHoursHigh,
          Description: sectionData.course.description,
        },
      };

      sections.push(section);
    }

    if (data.nextUrl) {
      await fetchSectionsBySubject(data.nextUrl, sections, params);
    }
  } catch (err) {
    console.error(`Failed to fetch from ${url}\n`, err.message);
  }

  return sections;
};

// termId = 20180
// gets the guid
export const fetchAllSections = async (termIds) => {
  const promises = subjects.map((subject) =>
    fetchSectionsBySubject(
      `${BASE_URL}${MIAMI_API_CONFIG.ENDPOINTS.COURSES}`,
      [],
      {
        params: {
          termCode: termIds,
          course_subjectCode: [String(subject)],
          limit: Number(200),
          compose: ["enrollmentCount", "schedules", "instructors"],
        },
      }
    )
  );

  const results = await Promise.allSettled(promises);

  const sections = results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value); // Equivalent to calling .map() then .flat()

  return sections;
};

export const buildCoursesFromSections = (sections) => {
  const courses = [];

  for (const sectionData of sections) {
    const term = sectionData.Course.Term;

    // Title+Subject+Campus = basically primary key
    const index = courses.findIndex((existingCourse) => {
      return (
        existingCourse.Term === term &&
        existingCourse.Campus === sectionData.Course.Campus &&
        existingCourse.Number === sectionData.Course.Number &&
        existingCourse.Subject === sectionData.Course.Subject
      );
    });
    if (index == -1) {
      // Course does not exist already
      const course = {
        ...sectionData.Course,
        Sections: [sectionData.Section],
      };
      courses.push(course);
    } else {
      // Course already exists
      courses[index].Sections.push(sectionData.Section);
    }
  }

  return courses;
};
/* Testing:

const terms = await fetchCustomTerms();
const ids = await fetchAllSectionIds(terms.map((termData) => termData.termId));
console.log(ids);

let terms = await fetchCustomTerms(0, 1);
terms = terms.map((termData) => String(termData.termId));
terms = ["202520"];
const sections = await fetchAllSections(terms);
console.log(sections.length);
const courses = buildCoursesFromSections(sections);
console.log(courses["202520"].length);
console.log("Done!");

*/

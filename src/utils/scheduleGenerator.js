import {
  convertToMinutes,
  getTimes,
  getMeetingDays,
  getDayIndex,
  getCorrespondingTime,
  timeRangesOverlap,
} from "./timeUtils.js";

const isValidSchedule = (schedule) => {
  for (const section of schedule) {
    // Ignore not properly formatted sections since it could screw up whole thing
    if (!section["Meeting Times"] || !section["Meeting Days"]) {
      continue;
    }

    const timesArray = section["Meeting Times"].split("|");
    const meetingDaysArr = getMeetingDays(section["Meeting Days"]);

    for (const otherSection of schedule) {
      if (section._id === otherSection._id) continue; // Don't compare same section
      if (!otherSection["Meeting Times"] || !otherSection["Meeting Days"]) {
        continue;
      }

      // "M", "T", "W"
      const otherTimesArray = otherSection["Meeting Times"].split("|");
      const otherMeetingDaysArr = getMeetingDays(otherSection["Meeting Days"]);

      // Check for any overlapping meeting days
      const overlappingDays = otherMeetingDaysArr.filter((dayValue) =>
        meetingDaysArr.includes(dayValue)
      );
      if (overlappingDays.length === 0) continue; // skip sections that don't overlap on same day

      for (const day of overlappingDays) {
        // Get the correct time on the given day
        const timeStr = getCorrespondingTime(
          section["Meeting Times"],
          getDayIndex(section["Meeting Days"], day)
        );
        const otherTimeStr = getCorrespondingTime(
          otherSection["Meeting Times"],
          getDayIndex(otherSection["Meeting Days"], day)
        );

        const [start, end] = getTimes(timeStr, 0);
        const [otherStart, otherEnd] = getTimes(otherTimeStr, 0);

        // Check for time overlap
        const overlaps = timeRangesOverlap(start, end, otherStart, otherEnd);
        if (overlaps) {
          return false; // early exit on first conflict
        }
      }
    }
  }

  return true;
};

class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

// Recursively build the all posssible schedule tree
const buildTree = (index, trees, selectionList, parentNode) => {
  if (index === selectionList.length) return; // Base case, reached the end of courses

  let courseData = selectionList[index];

  for (let i = 0; i < courseData.Sections.length; i++) {
    let sectionData = courseData.Sections[i];
    const node = new TreeNode({
      Title: courseData.Title,
      Subject: courseData.Subject,
      Number: courseData.Number,
      ...sectionData,
    });

    if (parentNode != null) {
      parentNode.addChild(node);
    } else {
      // This will become a root node
      trees.push(node);
    }
    buildTree(index + 1, trees, selectionList, node);
  }
};

// Recursively loops through the tree, builds schedules, and inserts once a leaf node is reached
const buildSchedule = (node, schedule, schedules) => {
  schedule.push(node.value);

  if (node.children.length === 0) {
    schedules.push(schedule);
    return;
  }

  node.children.forEach((childNode) => {
    buildSchedule(childNode, [...schedule], schedules);
  });
};

export const generate = (selectionList) => {
  const schedules = [];

  const trees = []; // Trees of all possible schedules, each root being each sections of selectionList[0]
  buildTree(0, trees, selectionList, null); // Constructing the tree

  trees.forEach((root) => {
    const subSchedules = [];
    buildSchedule(root, [], subSchedules);

    subSchedules.forEach((schedule) => {
      if (isValidSchedule(schedule)) {
        schedules.push(schedule);
      }
    });
  });

  return schedules;
};

import { convertToMinutes, getTimes, getMeetingDays } from "./timeUtils.js";

const sample = [
  [
    {
      Subject: "TST",
      Number: "131",
      Location: "UPH 100",
      "Meeting Days": "R",
      "Meeting Times": "5:00pm-8:00pm",
    },

    {
      Subject: "LOL",
      Number: "131",
      Location: "UPH 100",
      "Meeting Days": "M",
      "Meeting Times": "4:30pm-5:30pm",
    },
    {
      Subject: "LOL",
      Number: "131",
      Location: "UPH 100",
      "Meeting Days": "M",
      "Meeting Times": "6:30pm-9:30pm",
    },
  ],
];

const isValidSchedule = (schedule) => {
  for (const section of schedule) {
    // Ignore not properly formatted sections since it could screw up whole thing
    if (!section["Meeting Times"] || !section["Meeting Days"]) {
      continue;
    }

    const [rawStart, rawEnd] = getTimes(section["Meeting Times"]);
    const start = convertToMinutes(rawStart);
    const end = convertToMinutes(rawEnd);
    const meetingDays = getMeetingDays(section["Meeting Days"]);

    for (const otherSection of schedule) {
      if (section._id === otherSection._id) continue;

      if (!otherSection["Meeting Times"] || !otherSection["Meeting Days"]) {
        continue;
      }

      const [otherRawStart, otherRawEnd] = getTimes(
        otherSection["Meeting Times"]
      );
      const otherStart = convertToMinutes(otherRawStart);
      const otherEnd = convertToMinutes(otherRawEnd);
      const otherMeetingDays = getMeetingDays(otherSection["Meeting Days"]);

      // Check for any overlapping meeting days
      const sameDay = meetingDays.some((day) => otherMeetingDays.includes(day));
      if (!sameDay) continue;

      // Check for time overlap
      // let overlaps =
      //   (otherStart >= start && otherStart <= end) ||
      //   (otherEnd >= start && otherEnd <= end) ||
      //   (otherStart <= start && otherEnd >= end); // covers full overlap

      const overlaps = !(otherEnd <= start || otherStart >= end);
      if (overlaps) {
        return false; // early exit on first conflict
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
  if (index == selectionList.length) return; // Base case, reached the end of courses

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

  if (node.children.length == 0) {
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

  console.log(schedules);

  return schedules;
};

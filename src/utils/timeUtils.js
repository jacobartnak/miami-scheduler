export const convertToMinutes = (time) => {
  time = String(time);
  const [hourStr, minuteStr] = time.split(/[:\s]/);
  const period = time.includes("pm") ? "pm" : "am";
  let hours = parseInt(hourStr);
  const minutes = parseInt(minuteStr);

  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

// Meeting Days "F|M"
// Meeting Times "11:40am-1:00pm|11:40am-1:00pm"
// Meeting Locations "BEN 001|BEN 207"

// Meeting Days "MW"
// Meeting Times "2:15pm-4:05pm"
// Meeting Locations "BEN 009"

// Meeting Day "|T|T|T|T" // out data cleans out the first |
// Meeting Times "|6:30pm-8:00pm|6:30pm-8:00pm|6:30pm-8:00pm|6:30pm-8:00pm"
// Meeting Locations "WEB |IRV 224|IRV 224|IRV 224|IRV 224"

// getTimes("11:40am-1:00pm|11:40am-1:00pm", 1); // "11:40am-1:00pm"
// getTimes("2:15pm-4:05pm");                   // "2:15pm-4:05pm"
// getTimes("|6:30pm-8:00pm|6:30pm-8:00pm", 1); // "6:30pm-8:00pm"
export const getCorrespondingTime = (meetingTimes = "", dayIndex = 0) => {
  let time = meetingTimes.split("|");
  time = time[dayIndex] || time[0];

  return time;
};

// dayIndex is optional, but will get the meeting times for specfic day (default is 0)
export const getTimes = (meetingTimes, dayIndex = 0) => {
  const time = getCorrespondingTime(meetingTimes, dayIndex); //
  const split = time.split("-");
  const start = convertToMinutes(split[0]);
  const end = convertToMinutes(split[1]);

  return [start, end];
};

// "M|T" => "[M, T]"
// "MWF" => "[MWF]"
// filter(boolean) removed anything that is falsy,
export const daysToArray = (days) => days.split("|").filter(Boolean);
export const getDayIndex = (meetingDays, dayValue) => {
  // dayValue = "M"
  const dayArray = daysToArray(meetingDays);

  const index = dayArray.findIndex((str) => str.includes(dayValue));

  return index !== -1 ? index : 0;
};

export const getMeetingDays = (meetingDays) => {
  return meetingDays.split("").filter((char) => char !== "|");
};

export const timeRangesOverlap = (start1, end1, start2, end2) => {
  return (
    (start2 >= start1 && start2 < end1) ||
    (end2 > start1 && end2 <= end1) ||
    (start2 <= start1 && end2 >= end1)
  );
};

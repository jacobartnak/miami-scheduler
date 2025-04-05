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

export const getTimes = (meetingTimes) => {
  const split = meetingTimes.split("-");
  const start = convertToMinutes(split[0]);
  const end = convertToMinutes(split[1]);

  return [start, end];
};

export const getMeetingDays = (meetingDays) => {
  const days = [];

  meetingDays.split("").forEach((char) => {
    days.push(char);
  });

  return days;
};

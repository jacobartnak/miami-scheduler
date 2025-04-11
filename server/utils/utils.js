export const militaryToStandard = (str) => {
  let [hours, minutes] = str.split(":").map(Number);

  const suffix = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  return `${hours}:${minutes.toString().padStart(2, "0")}${suffix}`;
};

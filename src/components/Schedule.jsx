import React from "react";
import styled from "styled-components";
import ScheduleSlot from "./ScheduleSlot";
import {
  convertToMinutes,
  getTimes,
  getDayIndex,
  getCorrespondingTime,
} from "../utils/timeUtils";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const day_values = ["M", "T", "W", "R", "F"];
const times = [];

for (let i = 7; i <= 24; i++) {
  let formatted = i;

  if (i < 12) {
    // AM
    formatted = i + ":00am";
  } else if (i == 12) {
    // PM
    formatted = i + ":00pm";
  } else {
    formatted = i - 12 + ":00pm";
  }
  times.push(formatted);
}
const Wrapper = styled.div`
  margin: 0px auto 0px auto;
  border: 1px solid rgb(0, 0, 0, 0.3);
  display: flex;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: rgb(0, 0, 1, 0.5);
  padding: 10px;
  width: 70%;
  height: 80vh;
  aspect-ratio: 1 / 1;
  overflow-y: auto;

  .times {
    height: 1000px;
    margin-top: 100px;
    flex: 0 0 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .time {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      div {
        position: relative;
        text-align: center;
        padding-top: auto;
        top: -50%;
      }
    }
  }
  .days {
    height: 1100px;
    flex: 1;
    display: flex;
    justify-content: space-around;

    .day-container {
      flex: 0 0 20%;

      // Flex for the time label and bottom stuff
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .day-label {
        text-align: center;
        margin-bottom: 60px;
        padding-top: 15px;
      }

      .bottom {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;

        .time-slots {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;

          .time-slot {
            flex: 1;
            border-top: 1px solid rgb(0, 0, 0, 0.1);
            overflow: hidden;
          }
        }
      }
    }
  }
`;

const minTime = convertToMinutes(times[0]);
const maxTime = convertToMinutes(times[times.length - 1]);
const oneHourScale = 100 / times.length;

const Schedule = ({ schedule, selectionList }) => {
  const colorIndexes = {};

  selectionList.forEach((courseData, index) => {
    colorIndexes[courseData.Subject + courseData.Number] = index;
  });
  return (
    <Wrapper>
      <div className="times">
        {times.map((time, index) => {
          return (
            <div key={index} className="time">
              <div>{time}</div>
            </div>
          );
        })}
      </div>
      <div className="days">
        {days.map((day, dayIndex) => {
          return (
            <div key={dayIndex} className="day-container">
              <div className="day-label">{day}</div>
              <div className="bottom">
                <div className="time-slots">
                  {times.map((time, timeIndex) => {
                    return <div key={timeIndex} className="time-slot"></div>;
                  })}
                </div>

                {schedule != null &&
                  schedule.map((section, sectionIndex) => {
                    // M, T, W, R, F
                    const day_value = day_values[dayIndex];
                    const meetingDays = section["Meeting Days"];
                    const meetingTimes = section["Meeting Times"];

                    // Make sure day is valid
                    if (!meetingDays.includes(day_value)) return;

                    // Converting to military hours

                    // if we are on W, and days = "M|W", this returns 1
                    const correspondingDayIndex = getDayIndex(
                      meetingDays,
                      day_value
                    );

                    // get the correct time for the correct day
                    const correspondingTime = getCorrespondingTime(
                      meetingTimes,
                      correspondingDayIndex
                    );

                    const correspondingLocation = getCorrespondingTime(
                      section["Meeting Locations"],
                      correspondingDayIndex
                    );

                    // get start and end times for correct day
                    const [start, end] = getTimes(
                      meetingTimes,
                      correspondingDayIndex
                    );
                    const durationInHours = (end - start) / 60; // total duration of class
                    const top = ((start - minTime) / 60) * oneHourScale; // getting class start
                    const height = durationInHours * oneHourScale;

                    return (
                      <ScheduleSlot
                        key={sectionIndex}
                        section={section}
                        top={`${top}%`}
                        height={`${height}%`}
                        colorIndex={
                          colorIndexes[section.Subject + section.Number]
                        }
                        meetingTime={correspondingTime}
                        location={correspondingLocation}
                      />
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Schedule;

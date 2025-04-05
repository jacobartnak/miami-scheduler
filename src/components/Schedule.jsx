import React from "react";
import styled from "styled-components";
import ScheduleSlot from "./ScheduleSlot";
import { convertToMinutes, getTimes } from "../utils/timeUtils";
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const day_values = ["M", "T", "W", "R", "F"];
const times = [];

for (let i = 7; i <= 20; i++) {
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
  border: 1px solid rgb(0, 0, 0, 0.8);
  display: flex;

  width: 80%;
  aspect-ratio: 1 / 1;
  overflow: hidden;

  .times {
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
        margin-bottom: 75px;
      }

      .bottom {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        height: 100%;
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

const Schedule = ({ schedule }) => {
  if (!schedule) return;

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

                {schedule.map((section, sectionIndex) => {
                  // M, T, W, R, F
                  const day_value = day_values[dayIndex];

                  // Make sure day is valid
                  if (section["Meeting Days"].indexOf(day_value) == -1)
                    return null;

                  // Converting to military hours

                  const [start, end] = getTimes(section["Meeting Times"]);
                  const durationInHours = (end - start) / 60; // total duration of class
                  const top = ((start - minTime) / 60) * oneHourScale; // getting class start
                  const height = durationInHours * oneHourScale;

                  return (
                    <ScheduleSlot
                      key={sectionIndex}
                      section={section}
                      top={`${top}%`}
                      height={`${height}%`}
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

import React from "react";
import styled from "styled-components";
import Weekdays from "./Weekdays";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClockFour as clock,
  faUser as user,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  flex: 0 0 30%;
  //width: fit-content;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  padding: 6px;
  //aspect-ratio: 1 / 0.3;
  color: var(--light-black);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: nowrap;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
  }

  .section {
    height: 100%;
    margin-right: 10%;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .weekdays {
  }

  .meeting-times {
    margin-bottom: 8px;
    width: 100%;
  }
  .meeting-times,
  .instructors {
    display: flex;
    align-items: center;
    font-weight: 200;
    gap: 8px;
  }

  .instructors {
    bottom: 100%;
  }

  .crn {
    color: a29c9b;
    font-weight: 200;
  }
`;

//meetingTimes.length > 1 && meetingTimes.replace("|", " | ")
const SectionCard = ({ sectionData }) => {
  let meetingDays = sectionData["Meeting Days"];
  let meetingTimes = sectionData["Meeting Times"];
  const instructors = sectionData["Instructors"];
  let meetingText = [];
  if (meetingDays === null || meetingTimes.length < 1) {
    meetingText = ["-"];
  } else {
    // meetingTimes = meetingTimes.replace("|", " | ");
    // meetingDays = meetingDays.replace("|", " | ");

    if (meetingDays.indexOf("|") !== -1) {
      // Different times on each day
      // |T|T|T | |6:30pm-8:00pm|6:30pm-8:00pm|6:30pm-8:00pm

      const splitDay = meetingDays.split("|");
      const splitTimes = meetingTimes.split("|");

      for (let i = 1; i < splitDay.length; i++) {
        meetingText.push(splitDay[i] + " | " + splitTimes[i]);
      }
    } else {
      //TR | 4:25pm-5:45pm
      meetingText.push(meetingDays + " | " + meetingTimes);
    }
  }
  return (
    <Wrapper key={sectionData.CRN}>
      <div className="top">
        <div className="section">{`${sectionData.Section}`}</div>
        <div className="crn">{`${sectionData.CRN}`}</div>
        {/* <Weekdays /> */}
      </div>

      <div className="meeting-times">
        <FontAwesomeIcon icon={clock} />
        {meetingText.map((str, index) => {
          return (
            <span key={index} className="time-span">
              {str}
              {/* <br />  */}
            </span>
          );
        })}
      </div>

      <div className="instructors">
        <FontAwesomeIcon icon={user} />
        {instructors !== null
          ? instructors.indexOf(",") !== -1 // Artnak, Jacob
            ? `${instructors.split(",")[1]} ${instructors.split(",")[0]}` // Jacob, Artnak
            : instructors // Staff
          : null}
      </div>
    </Wrapper>
  );
};

export default SectionCard;

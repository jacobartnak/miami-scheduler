import React from "react";
import styled from "styled-components";
import SectionCard from "./SectionCard";
import colors from "../constants/colors";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: gray;
  width: 100%;
  color: var(--light-black);
  padding: 5px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: scroll;
  .slot-subject {
    font-size: 0.9rem;
    font-weight: 600;
  }

  .slot-times,
  .slot-location,
  .slot-professor {
    color: rgb(120, 120, 120);
    font-size: 0.7rem;
  }
  > :last-child {
    margin-top: auto;
  }
`;
const ScheduleSlot = ({
  section,
  top,
  height,
  colorIndex,
  meetingTime,
  location,
}) => {
  return (
    <Wrapper
      style={{ top: top, height: height, backgroundColor: colors[colorIndex] }}
    >
      <div className="slot-subject">
        {`${section.Subject} ${section.Number}${section.Section.trim()}`}
      </div>
      <div className="slot-times">
        <div>{meetingTime.replace("-", " - ")}</div>
      </div>

      <div>
        <div className="slot-location">{location}</div>
        <div className="slot-professor">{section["Instructors"]}</div>
      </div>
    </Wrapper>
  );
};

export default ScheduleSlot;

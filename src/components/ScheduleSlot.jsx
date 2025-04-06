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

  .slot-subject {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .slot-times,
  .slot-location {
    color: rgb(0, 0, 1, 0.5);
  }
  > :last-child {
    margin-top: auto;
  }
`;
const ScheduleSlot = ({ section, top, height, colorIndex }) => {
  return (
    <Wrapper
      style={{ top: top, height: height, backgroundColor: colors[colorIndex] }}
    >
      <div className="slot-subject">
        {section.Subject + " " + section.Number}
      </div>
      <div className="slot-times">{section["Meeting Times"]}</div>
      <div className="slot-location">{section["Meeting Locations"]}</div>
    </Wrapper>
  );
};

export default ScheduleSlot;

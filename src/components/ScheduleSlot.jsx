import React from "react";
import styled from "styled-components";
import SectionCard from "./SectionCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: gray;
  width: 100%;
  color: white;
  padding: 5px;

  > :last-child {
    margin-top: auto;
  }
`;
const ScheduleSlot = ({ section, top, height }) => {
  return (
    <Wrapper style={{ top: top, height: height }}>
      <div className="slot-subject">
        {section.Subject + " " + section.Number}
      </div>
      <div className="slot-times">{section["Meeting Times"]}</div>
      <div className="slot-location">{section["Meeting Locations"]}</div>
    </Wrapper>
  );
};

export default ScheduleSlot;

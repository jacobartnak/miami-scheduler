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
    font-weight: 300;
  }
`;
const SectionCard = ({ sectionData }) => {
  return (
    <Wrapper>
      <div className="top">
        <div className="section">{`${sectionData.Section}`}</div>
        <div className="crn">{`${sectionData.CRN}`}</div>
        {/* <Weekdays /> */}
      </div>

      <div className="meeting-times">
        <FontAwesomeIcon icon={clock} />

        {sectionData["Meeting Days"] !== null &&
          sectionData["Meeting Days"] !== "," &&
          sectionData["Meeting Days"].replace("|", " | ") + " - "}

        {sectionData["Meeting Times"] !== null &&
          sectionData["Meeting Times"].length > 1 &&
          sectionData["Meeting Times"].replace("|", " | ")}
      </div>

      <div className="instructors">
        <FontAwesomeIcon icon={user} />
        <div>{sectionData["Instructors"]}</div>
      </div>
    </Wrapper>
  );
};

export default SectionCard;

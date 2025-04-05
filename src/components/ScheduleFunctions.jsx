import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  margin: 10px 200px;
  display: flex;
  justify-content: end;

  .schedule-incrementer {
    width: 20%;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;

    .left {
      flex: 1;
      height: 100%;
    }

    .index {
      flex: 1;
      height: 100%;
      align-text: center;
    }
    .right {
      flex: 1;
      height: 100%;
    }
  }
`;
const ScheduleFunctions = ({ currentSchedule, setCurrentSchedule }) => {
  const clickHandler = (e) => {
    if (!e.target || e.target.name === "") return;
    setCurrentSchedule((prevData) => {
      return (prevData += Number(e.target.name));
    });
  };
  return (
    <Wrapper>
      <div className="schedule-incrementer">
        <button className="left" name="-1" onClick={clickHandler}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="index">{currentSchedule + 1}</div>
        <button className="right" name="1" onClick={clickHandler}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </Wrapper>
  );
};

export default ScheduleFunctions;

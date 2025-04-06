import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  width: 70%;
  margin: 0px auto 0px auto;
  display: flex;
  margin-bottom: 8px;
  justify-content: end;

  .schedule-incrementer {
    width: 15%;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;

    .left {
      flex: 1;
      height: 100%;
    }

    .index {
      flex: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 0.9rem;
      font-weight: 300;
    }
    .right {
      flex: 1;
      height: 100%;
    }
  }
`;
const ScheduleFunctions = ({
  currentSchedule,
  setCurrentSchedule,
  schedules,
}) => {
  const clickHandler = (e) => {
    if (!e.target || e.target.name === "") return;

    const num = Number(e.currentTarget.name);
    if (isNaN(num)) return;

    setCurrentSchedule((prevData) => {
      if (prevData + num < 0 || prevData + num >= schedules.length)
        return prevData;
      return (prevData += num);
    });
  };
  return (
    <Wrapper>
      <div className="schedule-incrementer">
        <button className="left" name="-1" onClick={clickHandler}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="index">{`${currentSchedule + 1} of ${
          schedules.length
        }`}</div>
        <button className="right" name="1" onClick={clickHandler}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </Wrapper>
  );
};

export default ScheduleFunctions;

import React from "react";
import styled from "styled-components";

const days = ["M", "T", "W", "T", "F"];

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  justify-content: flex-end;

  .day {
    width: 12%;
    max-width: 25px;
    aspect-ratio: 1 / 1;
    box-shadow: var(--box-shadow);
    text-align: center;
    border-radius: 0.3rem;
  }
`;
const Weekdays = () => {
  return (
    <Wrapper className="weekdays">
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="day" key={i}>
          {days[i]}
        </div>
      ))}
    </Wrapper>
  );
};

export default Weekdays;

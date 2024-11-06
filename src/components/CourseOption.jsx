import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle as plus } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.li`
  background-color: rgb(0, 0, 0, 0.008);
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  width: 100%;
  box-shadow: 0px 2px 0px 0px rgb(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: var(--border-radius);

  .text {
    background: none;
  }

  .add {
    background: none;
    color: #990100;
    aspect-ratio: 1/1;
  }
  .add:hover {
    color: #770100;
  }
  &:hover {
    background-color: var(--hover-color);
  }
`;

export default function CourseOption(props) {
  const { courseData, handleCourseSelect } = props;

  if (!courseData) {
    return;
  }
  return (
    <Wrapper onClick={() => handleCourseSelect(courseData)}>
      <div className="text">
        {courseData.Subject + " " + courseData.Number + " " + courseData.Title}
      </div>

      <button className="add">
        <FontAwesomeIcon className="icon" icon={plus} />
      </button>
    </Wrapper>
  );
}

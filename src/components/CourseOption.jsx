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
    display: flex;
    align-items: center;
    gap: 15px;

    .campus {
      font-size: 0.6rem;
      opacity: 0.5;
    }
  }

  .add {
    background: none;
    color: #990100;
    aspect-ratio: 1/1;
    width: 6%;

    .icon {
      width: 100%;
      height: 100%;
    }
  }
  .add:hover {
    color: #770100;
  }
  &:hover {
    background-color: var(--hover-color);
  }
`;

export default function CourseOption(props) {
  const { courseData, handleCourseSelect, formData } = props;

  if (!courseData) {
    return;
  }
  return (
    <Wrapper onClick={() => handleCourseSelect(courseData)}>
      <div className="text">
        <div>
          {courseData.Subject +
            " " +
            courseData.Number +
            " " +
            courseData.Title}
        </div>

        {formData.campus.Name === "All" && courseData.Campus !== "Oxford" && (
          <div className="campus">{courseData.Campus}</div>
        )}
      </div>

      <button className="add">
        <FontAwesomeIcon className="icon" icon={plus} />
      </button>
    </Wrapper>
  );
}

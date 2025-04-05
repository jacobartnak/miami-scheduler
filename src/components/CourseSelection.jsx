import React from "react";
import styled from "styled-components";

const colors = [
  "#ffadad",
  "#ffd6a5",
  "#fdffb6",
  "#caffbf",
  "#9bf6ff",
  "#a0c4ff",
  "#bdb2ff",
  "#ffc6ff",
];
const Wrapper = styled.div`
  background-color: #d6d5c9;
  padding: 10px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: var(--light-black);
  //height: fit-content;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sub {
      display: flex;
      align-items: center;

      .campus {
        font-size: 0.8rem;
        font-weight: 200;
      }
      .subject {
        font-size: 1.2rem;
        font-weight: 600;
        margin-right: 10px;
      }
    }

    .sections {
      font-size: 0.9rem;
      font-weight: 200;
    }
  }

  .title {
  }

  &:hover {
    opacity: 0.5;
  }
`;

const CourseSelection = ({ courseData, index }) => {
  const sections = courseData.Sections.length;

  return (
    <Wrapper style={{ backgroundColor: colors[index % colors.length] }}>
      <div className="top">
        <div className="sub">
          <div className="subject">
            {courseData.Subject} {courseData.Number}
          </div>

          <div className="campus">{courseData.Campus}</div>
        </div>

        <div className="sections">
          {sections} {(sections == 1 && "section") || "sections"}{" "}
        </div>
      </div>

      <div className="title">{courseData.Title}</div>
    </Wrapper>
  );
};

export default CourseSelection;

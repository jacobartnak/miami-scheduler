import React from "react";
import styled from "styled-components";
import colors from "../constants/colors";

const Wrapper = styled.div`
  background-color: #d6d5c9;
  padding: 10px;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: var(--light-black);
  height: 80px;
  overflow: scroll;

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .sub {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .campus {
        font-size: 0.7rem;
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
    font-size: 0.8rem;
    white-space: nowrap;
  }

  &:hover {
    opacity: 0.5;
  }
`;

const CourseSelection = ({ courseData, index, onClick }) => {
  const sections = courseData.Sections.length;

  return (
    <Wrapper
      style={{ backgroundColor: colors[index % colors.length] }}
      onClick={() => onClick(courseData.Subject + courseData.Number)}
    >
      <div className="top">
        <div className="sub">
          <div className="subject">
            {courseData.Subject} {courseData.Number}
          </div>

          <div className="campus">{courseData.Campus}</div>
        </div>

        {/* <div className="sections">
          {sections} {(sections == 1 && "section") || "sections"}{" "}
        </div> */}
      </div>

      <div className="title">{courseData.Title}</div>
    </Wrapper>
  );
};

export default CourseSelection;

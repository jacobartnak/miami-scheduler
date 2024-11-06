import React from "react";
import styled from "styled-components";
import SectionCard from "./SectionCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle as plus } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  background-color: #f6f6f6;
  color: var(--dark-black);
  width: 100%;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .top-data {
    display: flex;
    font-size: 0.9rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: gray;
  }

  .subject {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .description {
    font-size: 1rem;
    margin-bottom: 10px;
  }

  .sections-container {
    padding: 5px;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    overflow-x: auto;
    width: 100%;
    margin-bottom: 5px;
  }

  .bottom {
    display: flex;
    justify-content: flex-end;

    .add {
      display: flex;
      justify-content: center;
      color: white;
      align-items: center;
      background-color: #990100;
      border-radius: var(--border-radius);
      padding: 0.6rem;
      text-align: center;
      width: 10%;
      .icon {
        margin-right: 5px;
      }
    }

    .add:hover {
      background-color: #770100;
    }
  }
`;
const CourseData = ({ courseData }) => {
  return (
    <Wrapper className="course-data">
      {courseData && (
        <>
          <div className="top-data">
            <div className="subject">{`${courseData.Subject} ${courseData.Number}`}</div>
            <div className="credits">{`Credit Hours: ${courseData["Credit Hours"]}`}</div>
          </div>

          <div className="title">{`${courseData.Title}`}</div>
          <div className="description">{`${
            courseData.Description //.split(")")[1]
          }`}</div>

          <div className="sections-container">
            {courseData.Sections.map((sectionData) => {
              return <SectionCard sectionData={sectionData} />;
            })}
          </div>

          <div className="bottom">
            <button className="add">
              <FontAwesomeIcon className="icon" icon={plus} />
              <div>Add</div>
            </button>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default CourseData;

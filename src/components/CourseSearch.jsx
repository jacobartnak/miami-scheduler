import React from "react";
import CourseOption from "./CourseOption";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const CourseWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: column;

  .input-container {
    height: 12%;
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .search-icon {
    position: absolute;
    margin: 0px 8% 0px 3%;
  }
  // "type course here" input
  .course-input {
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    box-shadow: var(--box-shadow);
    padding-left: 8%;
    background-color: white;
    border-radius: 0.5rem;
  }

  // list that contains all course options
  .course-container {
    flex: 1;
    width: 100%;
    list-style-type: none;
    overflow-y: scroll;
    //height: calc(100% - 20px);
  }
`;

export const CourseSearch = ({
  formData,
  handleChange,
  courses,
  className,
}) => {
  return (
    <CourseWrapper className={`${className}`}>
      <div className="input-container">
        <FontAwesomeIcon className="search-icon" icon={faMagnifyingGlass} />
        <input
          className="course-input"
          type="text"
          placeholder="Type course here"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
        />
      </div>

      {/* Course options */}
      <ul className="course-container">
        {courses.map((courseData, index) => {
          const courseName = formData.courseName.toLowerCase();

          if (typeof courseData === "object" && courseData !== null) {
            let isMatch = false;

            if (
              courseData &&
              courseData.Subject &&
              courseData.Number &&
              courseData.Title
            ) {
              const inputName = formData.courseName
                .toLowerCase()
                .replace(" ", "");
              const fullName = (
                courseData.Subject +
                courseData.Number +
                courseData.Title
              )
                .toLowerCase()
                .replace(" ", "");

              isMatch = fullName.indexOf(inputName) !== -1;
            }

            // Return CourseOption if any of the matches are true
            if (isMatch) {
              return <CourseOption key={index} courseData={courseData} />;
            }
          }
          return null;
        })}
      </ul>
    </CourseWrapper>
  );
};

import React from "react";
import CourseOption from "./CourseOption";
import styled from "styled-components";

const CourseWrapper = styled.div`
  width: 50%;
  margin-right: 10px;
  // "type course here" input
  .course-input {
    width: 100%;
    padding-left: 5px;

    outline: none;
    border: none;
    box-shadow: 0 2px 5px 0 rgb(0, 0, 0, 0.1);
    padding: 1rem;
    background-color: white;
    border-radius: 0.5rem;
  }

  // list that contains all course options
  .course-container {
    width: 100%;
    list-style-type: none;
    overflow-y: scroll;
    max-height: 50vh;
  }
`;

export const CourseSearch = ({ formData, handleChange, courses }) => {
  return (
    <CourseWrapper>
      <input
        className="course-input"
        type="text"
        placeholder="Type course here"
        name="courseName"
        value={formData.courseName}
        onChange={handleChange}
      />

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

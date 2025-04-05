import { useRef, forwardRef } from "react";
import CourseOption from "./CourseOption";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const CourseWrapper = styled.div`
  margin-right: 10px;
  display: flex;
  flex-direction: column;

  .input-container {
    flex: 0 0 12%;
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    input {
      font-weight: 100;
    }
  }

  .search-icon {
    position: absolute;
    margin: 0px 8% 0px 3%;
  }
  // "type course here" input
  .course-input {
    color: var(--light-black);
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    box-shadow: var(--box-shadow);
    padding-left: 8%;
    background-color: white;
    border-radius: var(--border-radius);
  }

  // list that contains all course options
  .course-container {
    flex: 1;
    width: 100%;
    list-style-type: none;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 5px;
    //height: calc(100% - 20px);
  }
`;

const CourseSearch = ({
  formData,
  handleChange,
  courses,
  className,
  setSelectedCourse,
}) => {
  const handleCourseSelect = (data) => {
    setSelectedCourse(() => {
      setSelectedCourse(data);
    });
  };

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
              formData.campus.Name !== "All" &&
              formData.campus.Name !== courseData.Campus
            ) {
              isMatch = false;
            } else if (
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
              return (
                <CourseOption
                  handleCourseSelect={handleCourseSelect}
                  key={index}
                  courseData={courseData}
                  formData={formData}
                />
              );
            }
          }
          return null;
        })}
      </ul>
    </CourseWrapper>
  );
};

export default CourseSearch;

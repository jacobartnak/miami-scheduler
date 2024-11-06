import { useState, useEffect } from "react";
import CourseOption from "./CourseOption";
import TermOption from "./TermDropdownItem";
import styled from "styled-components";
import axios from "axios";
import Dropdown from "./Dropdown";
import TermDropdownItem from "./TermDropdownItem";
import { CourseSearch } from "./CourseSearch";
import { Link } from "react-router-dom";
import CourseData from "./CourseData";
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SearchContainerWrapper = styled.div`
  padding: 20px; //also adjust calc in course-container
  height: 440px;
  display: flex;

  .right-side {
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 60vw;

    .dropdown-container {
      display: flex;
      gap: 5px;
    }
  }

  .left-side {
    height: 100%;
    width: 40vw;
  }
  .term-dropdown {
    height: 12%; //matches with input-container
    width: fit-content;
    margin-bottom: 10px;
  }
`;

export default function Search(props) {
  const { formData, handleChange, handleSubmit, setFormKey } = props;
  const [currentDropdown, setCurrentDropdown] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/courses/getAllCourses"
        );
        setCourses(response.data);
      } catch (error) {
        console.log("Error while fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  console.log("H");
  return (
    <>
      <SearchContainerWrapper>
        <CourseSearch
          className="left-side"
          formData={formData}
          handleChange={handleChange}
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />

        {/* Term search box */}

        <div className="right-side">
          <div className="dropdown-container">
            <Dropdown
              className="term-dropdown"
              buttonText={
                formData.term === "" ? "Select Term" : "Term " + formData.term
              }
              content={items.map((item) => (
                <TermDropdownItem
                  key={item}
                  termData={{
                    id: item,
                    name: item,
                  }}
                  setFormKey={setFormKey}
                >
                  {`Spring Semester 202${4 - item}-${5 - item}`}
                </TermDropdownItem>
              ))}
            ></Dropdown>

            <Dropdown
              className="term-dropdown"
              buttonText={
                formData.campus === ""
                  ? "Select Campus"
                  : "Campus " + formData.term
              }
              content={items.map((item) => (
                <TermDropdownItem
                  key={item}
                  termData={{
                    id: item,
                    name: item,
                  }}
                  setFormKey={setFormKey}
                >
                  {`Spring Semester 202${4 - item}-${5 - item}`}
                </TermDropdownItem>
              ))}
            ></Dropdown>
          </div>

          <CourseData courseData={selectedCourse}></CourseData>
        </div>

        {/* Course search box */}
      </SearchContainerWrapper>

      {/* <Link to="/add" type="button">
        Add Course
      </Link> */}
    </>
  );
}

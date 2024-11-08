import { useState, useEffect, useRef } from "react";
import CourseOption from "./CourseOption";
import TermOption from "./DropdownItem";
import styled from "styled-components";
import axios from "axios";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";
import CourseSearch from "./CourseSearch";
import { Link } from "react-router-dom";
import CourseData from "./CourseData";
import SelectionContainer from "./SelectionContainer";
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SearchContainerWrapper = styled.div`
  margin: 50px; //also adjust calc in course-container
  max-height: 550px;
  min-height: 550px;
  display: flex;
  align-items: stretch;

  .right-side {
    display: flex;
    flex-direction: column;
    max-width: 60%;
    min-width: 60%;
    .dropdown-container {
      display: flex;
      gap: 5px;
    }
  }

  .left-side {
    max-width: 40%;
    min-width: 40%;
  }

  .term-dropdown {
    margin-right: 5px;
  }
  .dropdown-container {
    flex: 0 0 12%;
    width: fit-content;
    margin-bottom: 10px;
  }
`;

const termValues = {
  // for sorting, use decimals or else won't work due to years being 1 apart
  Fall: 0,
  Winter: 0.1,
  Spring: 0.2,
  Summer: 0.3,
};
const campusValues = {
  // for sorting
  All: 0,
  Oxford: 1,
  Hamilton: 2,
  Middletown: 3,
  "VOA - West Chester": 4,
  Luxembourg: 5,
};
export default function Search(props) {
  const { formData, handleChange, handleSubmit, setFormKey } = props;
  const [currentDropdown, setCurrentDropdown] = useState(null);
  const [courses, setCourses] = useState([]);
  const [terms, setTerms] = useState([]);
  const [campuses, setCampuses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/courses/getAllCourses"
        );

        setCourses(response.data);
      } catch (error) {
        console.log("Error while fetching courses: ", error);
      }
    };

    const fetchTerms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/terms/getAllTerms"
        );

        const data = response.data;
        const compareFn = (a, b) => {
          const splitA = a.Name.split(" ");
          const splitB = b.Name.split(" ");

          const termValueA = termValues[splitA[0]]; //Spring
          const termValueB = termValues[splitB[0]];

          const valueA = termValueA + Number(splitA[2].split("-")[0]); // ... + 2024
          const valueB = termValueB + Number(splitB[2].split("-")[0]);

          if (valueA > valueB) {
            return -1;
          } else if (valueA < valueB) {
            return 1;
          }

          return 0;
        };
        setTerms(data.sort(compareFn));
        setFormKey("term", data[0]);
      } catch (error) {
        console.log("Error while fetching terms: ", error);
      }
    };

    const fetchCampuses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/campuses/getAll"
        );

        const compareFn = (a, b) => {
          const valueA = campusValues[a.Name] || 10;
          const valueB = campusValues[b.Name] || 10;

          if (valueA < valueB) {
            return -1;
          } else if (valueA > valueB) {
            return 1;
          }

          return 0;
        };

        const data = response.data.sort(compareFn);

        data.push({
          _id: "All",
          Id: "All",
          Name: "All",
        });

        setCampuses(data);
        // Initially setting campus to oxford

        response.data.map((item) => {
          if (item.Name === "Oxford") {
            setFormKey("campus", item);
          }
        });
      } catch (error) {
        console.log("Error while fetching campuses: ", error);
      }
    };
    fetchCampuses();
    fetchTerms();
    fetchCourses();
  }, []);

  console.log("Rendered");

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
                formData.term === null ? "Select Term" : formData.term.Name
              }
              content={terms.map((item) => (
                <DropdownItem
                  key={item._id}
                  onClick={() => {
                    setFormKey("term", item);
                    console.log("H");
                  }}
                >
                  {item.Name}
                </DropdownItem>
              ))}
            ></Dropdown>

            <Dropdown
              className="campu-dropdown"
              buttonText={
                formData.campus === null
                  ? "Select Campus"
                  : formData.campus.Name
              }
              content={campuses.map((item) => (
                <DropdownItem
                  key={item._id}
                  onClick={() => setFormKey("campus", item)}
                >
                  {item.Name}
                </DropdownItem>
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

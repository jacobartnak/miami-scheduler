import { useState, useEffect } from "react";
import CourseOption from "./CourseOption";
import TermOption from "./TermDropdownItem";
import styled from "styled-components";
import axios from "axios";
import Dropdown from "./Dropdown";
import TermDropdownItem from "./TermDropdownItem";
import { CourseSearch } from "./CourseSearch";
import { Link } from "react-router-dom";

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const SearchContainerWrapper = styled.div`
  display: flex;
  margin: 20px;
`;

export default function Search(props) {
  const { formData, handleChange, handleSubmit, setFormKey } = props;
  const [currentDropdown, setCurrentDropdown] = useState(null);
  const [courses, setCourses] = useState([]);

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
      <SearchContainerWrapper className="search-container">
        {/* Course search box */}
        <CourseSearch
          formData={formData}
          handleChange={handleChange}
          courses={courses}
        />

        {/* Term search box */}
        <Dropdown
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
              {`Item ${item}`}
            </TermDropdownItem>
          ))}
        />
      </SearchContainerWrapper>

      <Link to="/add" type="button">
        Add Course
      </Link>
    </>
  );
}

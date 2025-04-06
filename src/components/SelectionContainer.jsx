import React from "react";
import styled from "styled-components";
import CourseSelection from "./CourseSelection";

const Wrapper = styled.div`
  margin: 50px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
  min-height: 80px;
`;
const SelectionContainer = ({ selectionList, setSelectionList }) => {
  const handleClick = (id) => {
    setSelectionList((prevData) => {
      return prevData.filter((sectionData) => {
        return sectionData.Subject + sectionData.Number !== id;
      });
    });
  };
  return (
    <Wrapper>
      {selectionList.map((courseData, index) => {
        return (
          <CourseSelection
            courseData={courseData}
            index={index}
            key={index}
            onClick={handleClick}
          />
        );
      })}
    </Wrapper>
  );
};

export default SelectionContainer;

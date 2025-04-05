import React from "react";
import styled from "styled-components";
import CourseSelection from "./CourseSelection";

const Wrapper = styled.div`
  margin: 50px;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(15%, 1fr));
`;
const SelectionContainer = ({ selectionList }) => {
  return (
    <Wrapper>
      {selectionList.map((courseData, index) => {
        return (
          <CourseSelection courseData={courseData} index={index} key={index} />
        );
      })}
    </Wrapper>
  );
};

export default SelectionContainer;

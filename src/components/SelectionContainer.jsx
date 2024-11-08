import React from "react";
import styled from "styled-components";
import CourseSelection from "./CourseSelection";

const Wrapper = styled.div`
  margin: 50px;
  background-color: gray;
`;
const SelectionContainer = ({ courses }) => {
  return (
    <Wrapper>
      hihhhhh
      <CourseSelection />
    </Wrapper>
  );
};

export default SelectionContainer;

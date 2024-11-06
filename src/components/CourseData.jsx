import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  opacity: 0.5;
  background-color: white;
  width: 100%;
  flex: 1;
  box-shadow: var(--box-shadow);
  border-radius: 0.5rem;
`;
const CourseData = () => {
  return <Wrapper className="course-data">Course Data</Wrapper>;
};

export default CourseData;

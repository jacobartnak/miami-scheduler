import React from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  text-align: left;
  background-color: white;
  outline: none;
  border: none;
  box-shadow: 0 1px 5px 0 rgb(0, 0, 0, 0.1);
  padding: 1rem;
  margin: 0.1rem 0;
  border-radius: 0.5rem;
`;

export default function CourseOption(props) {
  const { courseData } = props;

  if (!courseData) {
    return;
  }
  return (
    <li>
      <Button>
        {courseData.Subject + " " + courseData.Number + " " + courseData.Title}
      </Button>
    </li>
  );
}

import React from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  width: 100%;
  text-align: left;
  background-color: white;
  outline: none;
  border: none;
  box-shadow: 0px 2px 0px 0px rgb(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 3px;
  border-radius: 0.5rem;

  &:hover {
    background-color: var(--hover-color);
  }
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

import React from "react";
import styled from "styled-components";

// const Button = styled.button`
//   background-color: white;
//   color: black;
//   outline: none;
//   border: none;
//   margin-bottom: 0.2rem;
//   &:hover {
//     font-weight: bold;
//   }
// `;

const ItemWrapper = styled.div`
  &.dropdown-item {
    padding: 0.5rem;
    margin: 0.1rem;
    width: 100%;
    border-radius: var(--border-radius);
    cursor: pointer;
    color: var(--light-black);
  }

  &.dropdown-item:hover {
    background-color: var(--hover-color);
  }
`;

export default function TermDropdownItem({ termData, setFormKey }) {
  return (
    <ItemWrapper
      className="dropdown-item"
      name="term"
      onClick={() => setFormKey("term", termData.id)}
    >
      {"Term " + termData.name}
    </ItemWrapper>
  );
}

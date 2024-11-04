import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Btn = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px 0 rgb(0, 0, 0, 0.1);
  cursor: pointer;
  .toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
  }

  &.button-open {
    outline: #ffc8c8 2px solid;
  }
`;

const DropdownButton = forwardRef((props, ref) => {
  const { children, open, toggle } = props;
  return (
    <Btn
      onClick={toggle}
      className={`dropdown-btn ${open ? "button-open" : null}`}
      ref={ref}
    >
      {children}
      <FontAwesomeIcon
        className="toggle-icon"
        icon={(open && faChevronUp) || faChevronDown}
      />
    </Btn>
  );
});

export default DropdownButton;

import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Btn = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  color: color: var(--light-black);
  cursor: pointer;
  .toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
  }

  &.button-open {
    outline: var(--hover-color) 2px solid;
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

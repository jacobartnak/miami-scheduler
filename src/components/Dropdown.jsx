import { useState, useRef, useEffect } from "react";
import DropdownButton from "./DropdownButton";
import DropdownContent from "./DropdownContent";
import TermOption from "./TermDropdownItem";
import styled from "styled-components";

const Div = styled.div`
  position: relative;
  z-index: 1000;
`;
const Dropdown = ({ buttonText, content, children, className }) => {
  const [open, setOpen] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const dropdownRef = useRef();
  const buttonRef = useRef();
  const contentRef = useRef();
  const toggleDropdown = () => {
    // This is so the dropdown doesn't clip through the screen
    // and always allows the user to see its
    if (!open) {
      const spaceRemaining =
        window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
      const contentHeight = contentRef.current.clientHeight;
      const topPosition =
        spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;

      setDropdownTop(topPosition);
    }
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [dropdownRef]);

  return (
    <Div className={`${className}`} ref={dropdownRef}>
      <DropdownButton ref={buttonRef} toggle={toggleDropdown} open={open}>
        {buttonText}
      </DropdownButton>
      <DropdownContent top={dropdownTop} ref={contentRef} open={open}>
        {content}
      </DropdownContent>

      {children}
    </Div>
  );
};

export default Dropdown;

import { forwardRef } from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  &.dropdown-content {
    position: absolute;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin-top: 0.5rem;
    background-color: white;
    border-radius: 0.5rem;
    max-height: 40vh;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    opacity: 0;

    transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
    transform: translateY(-5%);

    pointer-events: none; // so when -10px up, you can still click select term
    box-shadow: 0 2px 5px 0 rgb(0, 0, 0, 0.1);

    overflow-y: scroll;
  }

  &.dropdown-content::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  &.content-open {
    opacity: 1;
    transform: translateY(0px);
    pointer-events: all;
  }
`;
const DropdownContent = forwardRef((props, ref) => {
  const { children, open, top } = props;
  return (
    <ContentWrapper
      className={`dropdown-content ${open ? "content-open" : null}`}
      style={{ top: top ? `${top}px` : "100%" }}
      ref={ref}
    >
      {children}
    </ContentWrapper>
  );
});

export default DropdownContent;

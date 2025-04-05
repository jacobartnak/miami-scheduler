import React from "react";
import styled from "styled-components";
import miamiLogo from "../assets/miami-logo.png";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  box-shadow: 0 2px 5px 0px rgb(0, 0, 0, 0.04);

  .header {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .left-header {
    padding: 8px 0px 8px 20px;
  }

  .right-header {
    padding: 8px 20px 8px 0px;
  }
  .miami-logo {
    margin-right: 20px;
    height: 100%;
    object-fit: contain;
  }

  .navigation {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }

  .header a {
    color: var(--light-black);
    opacity: 0.5;
    height: 100%;
  }

  .header a:hover {
    opacity: 1;
  }
  .left-navigation a {
    margin-right: 30px;
  }

  .right-navigation a {
    margin-left: 30px;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <div className="header left-header">
        <img src={miamiLogo} alt="Miami Logo" className="miami-logo" />

        <ul className="navigation left-navigation">
          <li>
            <a>Scheduler</a>
            <a>Seat Notifier</a>
            <a>Automatic Registration</a>
          </li>
        </ul>
      </div>

      <div className="header right-header">
        <ul className="navigation right-navigation">
          <li>
            <a>Feedback</a>
            <a>Donate</a>
          </li>
        </ul>
      </div>
    </HeaderWrapper>
  );
};

export default Header;

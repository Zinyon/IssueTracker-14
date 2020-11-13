import React from "react";
import { Link } from "react-router-dom";
import A from "./../../components/atoms/index";
import colors from "./../../constants/colors";
import styled from "styled-components";

const StyledHeader = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0px;
  width: 100%;
  height: 6rem;
  color: ${colors["white"]};
  background-color: ${colors["black"]};
  font-size: 185%;
`;

const StyledLogoutWrapper = styled.div`
  position: absolute;
  right: 2rem;
  top: 0;
  height: 6rem;
  display: flex;
  align-items: center;
`;

const Header = () => {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("nickname");
    localStorage.removeItem("userImage");
    location.href = "/";
  };

  return (
    <>
      <StyledHeader>
        <A.Text hover color={"white"} onClick={() => (location.href = "/")}>
          <A.Icon name={"book"} cursor={"text"} />
          IssueTracker-Team14
        </A.Text>
      </StyledHeader>
      <StyledLogoutWrapper>
        <A.Button width="auto" onClick={logout} backgroundColor={"black"}>
          <A.Text color={"white"}>Logout</A.Text>
        </A.Button>
      </StyledLogoutWrapper>
    </>
  );
};

export default Header;

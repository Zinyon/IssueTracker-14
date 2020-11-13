import React, { useReducer, useCallback } from "react";
import colors from "./../../constants/colors";
import styled from "styled-components";
import A from "../../components/atoms/index";
import M from "../../components/molecules/index";
import O from "../../components/organisms/index";

const LoginPageWrapper = styled.div`
  display: flex;
  background-color: ${colors.lightGrey};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  font-size: 62.5%;
  min-width: 50rem;
`;

const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <M.Title>이슈트래커</M.Title>
      <O.LoginForm />
    </LoginPageWrapper>
  );
};

export default LoginPage;

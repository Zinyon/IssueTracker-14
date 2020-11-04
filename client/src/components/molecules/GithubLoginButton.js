import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import Button from "../atoms/Button";
import Text from "../atoms/Text";

const StyledLoginButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  width: 80%;
`;

const GithubLoginButton = ({ children }) => (
  <StyledLoginButton>
    <Button border backgroundColor={colors.black} width={"100%"} height={"60%"}>
      <Text color={colors.white} fontSize={"small"}>
        Github으로 로그인하기
      </Text>
    </Button>
  </StyledLoginButton>
);

export default GithubLoginButton;

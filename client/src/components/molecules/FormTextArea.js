import React from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "./index";

const StyledFormTextArea = styled.div`
  position: relative;
`;

const StyledTextWrapper = styled.div`
  position: absolute;
  right: 0.8rem;
  bottom: 3rem;
`;

const StyledTextAreaWrapper = styled.div`
  margin-bottom: 1rem;
`;

const FormTextArea = ({
  label,
  htmlFor,
  name,
  placeholder,
  rows,
  bgColor,
  charLength,
  onChange,
  width,
  height,
  ...rest
}) => {
  return (
    <StyledFormTextArea>
      <StyledTextWrapper>
        <A.Text cursor={"default"} hover={false} fontSize={"0.8rem"}>
          {charLength} characters
        </A.Text>
      </StyledTextWrapper>
      <StyledTextAreaWrapper>
        <A.TextArea
          name={name}
          placeholder={placeholder}
          rows={rows}
          bgColor={bgColor}
          width={"100%"}
          {...rest}
          onChange={onChange}
        />
        <M.FileInput />
      </StyledTextAreaWrapper>
    </StyledFormTextArea>
  );
};

export default FormTextArea;

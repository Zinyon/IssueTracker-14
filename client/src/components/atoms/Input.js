import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";

const StyledInput = styled.input`
  outline: none;
  box-sizing: border-box;
  border: 1px solid #d1d5da;
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  font-size: ${({ fontSize }) => fontSize};
  border-radius: ${({ rounded }) => (rounded ? 4 : 0)}px;
  color: #000000;
  background-color: ${({ bgColor }) => (bgColor ? colors[bgColor] : "inherit")};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  opacity: ${({ opacity }) => opacity};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  &:focus {
    border: 2px solid ${colors["lightBlue"]};
    border-radius: 4px;
  }
`;

const Input = ({
  type,
  placeholder,
  name,
  width,
  margin,
  padding,
  fontSize,
  rounded,
  id,
  onChange,
  value,
  ...rest
}) => (
  <StyledInput
    type={type}
    placeholder={placeholder}
    margin={margin}
    padding={padding}
    fontSize={fontSize}
    rounded={rounded}
    id={id}
    name={name}
    width={width}
    onChange={onChange}
    value={value}
    {...rest}
  />
);

Input.defaultProps = {
  // margin: "0.75rem",
  // padding: "0.75rem",
  fontSize: "0.75rem",
  rounded: false,
  placeholder: "",
  height: "2.3rem",
  value: undefined,
};

export default Input;

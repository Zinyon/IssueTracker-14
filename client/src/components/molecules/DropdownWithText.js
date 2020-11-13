import React, { Fragment } from "react";
import styled from "styled-components";
import A from "../atoms/index";
import M from "./index";
import { useIssueDispatch } from "../../stores/issue";

const StyledDropDownWithText = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #e3e3e4;
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
`;

const DropDownWithText = ({
  optionId,
  buttonData,
  buttonText,
  labelText,
  showDropdown,
  search,
  icon,
  selected,
  defaultText,
  fontSize,
  fetchData,
  ...rest
}) => {
  const issueDispatch = useIssueDispatch();

  return (
    <StyledDropDownWithText>
      <M.Dropdown
        optionId={optionId}
        buttonData={buttonData}
        buttonText={buttonText}
        btnDisplay={"flex"}
        btnJustify={"space-between"}
        btnPadding={0}
        labelText={labelText}
        buttonWidth={"100%"}
        showDropdown={showDropdown}
        icon={icon}
        fetchData={fetchData}
        selected={selected}
        search={false}
      ></M.Dropdown>
      {!selected || selected.length === 0 ? (
        <A.Text
          hover={false}
          fontSize={fontSize}
          align={"left"}
          onClick={
            optionId === 0
              ? () =>
                  issueDispatch({
                    type: "ADD_ASSIGNEE",
                    data: Number(localStorage.getItem("userId")),
                  })
              : null
          }
        >
          {defaultText}
        </A.Text>
      ) : (
        selected.map((el, idx) => {
          if (optionId === 0) {
            return (
              <StyledFlex key={el.id}>
                <A.Image size={"15px"} imageUrl={el.imageurl} />
                <A.Text hover={false} fontSize={fontSize}>
                  {el.nickname}
                </A.Text>
              </StyledFlex>
            );
          }

          if (optionId === 1) {
            return (
              <Fragment key={el.id}>
                <StyledFlex>
                  <A.Label backgroundHexaColor={el.color}>{el.title}</A.Label>
                  <A.Text hover={false} fontSize={fontSize}>
                    {el.description}
                  </A.Text>
                </StyledFlex>
              </Fragment>
            );
          }

          if (optionId === 2) {
            return (
              <A.Text key={el.id} hover={false} fontSize={fontSize}>
                {el.title}
              </A.Text>
            );
          }
        })
      )}
    </StyledDropDownWithText>
  );
};

export default DropDownWithText;

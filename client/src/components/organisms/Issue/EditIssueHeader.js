import React from "react";
import styled from "styled-components";
import A from "../../atoms/index";
import O from "../../organisms/index";
import calculateTime from "../../../utils/calculateTime";

const StyledEditIsssueHeader = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid #d1d5da;
  margin-bottom: 1rem;
`;

const StyledFlex = styled.div`
  display: flex;
  align-items: center;
`;

const EditIssueHeader = ({ issue, issueStatus }) => {
  return (
    <StyledEditIsssueHeader>
      <O.EditIssueTitle
        id={issue.id}
        title={issue.title}
        status={issueStatus}
      />
      <StyledFlex>
        <A.Button
          cursor={"default"}
          backgroundColor={issueStatus === "open" ? "green" : "red"}
          width={"auto"}
        >
          <A.Icon name="alert" color={"white"}></A.Icon>
          <A.Text color={"white"} display={"inline"}>
            {issueStatus}
          </A.Text>
        </A.Button>
        <A.Text>
          <span style={{ fontWeight: "bold" }}>{issue.user.nickname}</span>{" "}
          {issue.status}ed this issue {calculateTime(issue.createdAt)} &middot;{" "}
          <span>
            {issue.comments.length === 0 ? 0 : issue.comments.length - 1}{" "}
            comment
          </span>
        </A.Text>
      </StyledFlex>
    </StyledEditIsssueHeader>
  );
};

export default EditIssueHeader;

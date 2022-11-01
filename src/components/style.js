import styled from 'styled-components';

//IssueList Components
export const ItemContainer = styled.div`
  border-bottom: 1px solid black;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;
export const ItemDetails = styled.div`
  flex-basis: 70%;
`;

export const IssueContainerHeader = styled.div`
  display: flex;
`;
export const IssueTitle = styled.div`
  margin-left: 1em;
  font-weight: bolder;
  margin-bottom: 1.2em;
`;
export const IssueListUserName = styled.div`
  color: purple;
`;

export const CreatedAt = styled.div``;
export const CommentCounter = styled.div`
  p {
    margin: 0;
  }
  flex-basis: 15%;
  text-align: end;
  display: flex;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

//DetailPage Components
export const UserAvaterImg = styled.img`
  width: 4em;
  height: 4em;
  margin: auto 0;
`;
export const MarkdownContainer = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    overflow: visible;
  }
`;
// ErrorPage Components
export const ErrorComponent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 13em;
`;

export const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5em auto;
  height: 30%;
  width: 30%;
`;

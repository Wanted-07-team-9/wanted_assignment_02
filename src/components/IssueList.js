import * as Styled from './style';
import { useNavigate } from 'react-router-dom';

const IssueList = props => {
  const navigate = useNavigate();
  const onChangePage = () => {
    navigate(`/detail/${props.number}`, { replace: false });
  };
  return (
    <>
      <Styled.ItemContainer onClick={onChangePage}>
        <Styled.ItemDetails>
          <Styled.IssueContainerHeader>
            <>#{props.number}</>
            <Styled.IssueTitle>{props.title}</Styled.IssueTitle>
          </Styled.IssueContainerHeader>
          <Styled.IssueListUserName>{props.user.login}</Styled.IssueListUserName>
          <Styled.CreatedAt>{props.Created_at}</Styled.CreatedAt>
        </Styled.ItemDetails>
        <Styled.CommentCounter>
          <p>코멘트:</p>
          <p>{props.comments}</p>
        </Styled.CommentCounter>
      </Styled.ItemContainer>
    </>
  );
};

export default IssueList;

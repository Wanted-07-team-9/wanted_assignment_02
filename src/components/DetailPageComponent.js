import * as Styled from './style';
import ReactMarkdown from 'react-markdown';

const DetailPageComponent = ({ detailPageData }) => {
  const markdown = detailPageData.body;

  return (
    <>
      <Styled.ItemContainer>
        <Styled.UserAvaterImg src={`${detailPageData.user.avatar_url}`} alt="avatar" />
        <Styled.ItemDetails>
          <Styled.IssueContainerHeader>
            <>#{detailPageData.number}</>
            <Styled.IssueTitle>{detailPageData.title}</Styled.IssueTitle>
          </Styled.IssueContainerHeader>
          <Styled.IssueListUserName>{detailPageData.user.login}</Styled.IssueListUserName>
          <Styled.CreatedAt>{detailPageData.Created_at}</Styled.CreatedAt>
        </Styled.ItemDetails>
        <Styled.CommentCounter>
          <p>코멘트:</p>
          <p>{detailPageData.comments}</p>
        </Styled.CommentCounter>
      </Styled.ItemContainer>
      <Styled.MarkdownContainer>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </Styled.MarkdownContainer>
    </>
  );
};

export default DetailPageComponent;

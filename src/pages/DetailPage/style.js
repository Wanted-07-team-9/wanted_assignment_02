import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 10em;
  @media screen and (max-width: 768px) {
    padding: 8em 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

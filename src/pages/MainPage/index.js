import { useState, useEffect, useRef, useCallback } from 'react';
import { getIssueList } from '../../api/getData';
import Loading from '../../components/Loading';
import IssueList from '../../components/IssueList';
import AdsBox from '../../components/AdsBox';
import * as Styled from './style';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [issueDataArr, setIssueDataArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const navigate = useNavigate();

  const handleObserver = useCallback(entries => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage(prev => prev + 1);
    }
  }, []);
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  useEffect(() => {
    try {
      getIssueList(page)
        .then(res => {
          if (page === 1) {
            setIssueDataArr(res);
          } else {
            setIssueDataArr(prev => [...prev, ...res]);
          }
        })
        .then(() => {
          setIsLoading(false);
        });
    } catch (e) {
      console.log(e.message);
      navigate('/');
    }
  }, [page]);

  return (
    <>
      <Styled.PageContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div>
              {issueDataArr.map((el, idx) => {
                if (idx < 4) {
                  return (
                    <IssueList
                      key={el.id}
                      number={el.number}
                      title={el.title}
                      user={el.user}
                      created_at={el.created_at}
                      comments={el.comments}
                    />
                  );
                }
              })}
            </div>
            <AdsBox />
            <div>
              {issueDataArr.map((el, idx) => {
                if (idx >= 4) {
                  return (
                    <IssueList
                      key={el.id}
                      number={el.number}
                      title={el.title}
                      user={el.user}
                      created_at={el.created_at}
                      comments={el.comments}
                    />
                  );
                }
              })}
            </div>
          </>
        )}
      </Styled.PageContainer>
      <div ref={loader} />
    </>
  );
};

export default MainPage;

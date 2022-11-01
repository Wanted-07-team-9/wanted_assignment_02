import { useState, useEffect, useCallback, useRef } from 'react';
import IssueList from '../../components/IssueList';
import AdsBox from '../../components/AdsBox';
import Loading from '../../components/Loading';
import * as Styled from './style';
import { useNavigate } from 'react-router-dom';
import { useDataListState, useListDispatch, getDataList } from '../../context/IssueContext';

const MainPage = () => {
  const state = useDataListState();
  const { data: issueDataArray, page: currentPage, loading, error } = state.dataList;
  const [issueDataArr, setIssueDataArr] = useState([]);
  const [page, setPage] = useState(currentPage);
  const dispatch = useListDispatch();
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
      rootMargin: '10px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);

    return () => {
      observer && observer.disconnect();
    };
  }, [handleObserver, loader]);
  useEffect(() => {
    if (page === undefined) setPage(0);
    getDataList(dispatch, page);
  }, [page]);
  useEffect(() => {
    try {
      if ((page === 1 || page === 2) && !issueDataArray === false) {
        setIssueDataArr([...issueDataArray]);
      } else if (page > 2 && !issueDataArray === false) {
        setIssueDataArr(prev => [...prev, ...issueDataArray]);
      }
    } catch (e) {
      console.log(e.message);
      navigate('/error');
    }
  }, [loading, page]);

  if (error) navigate('/error');

  return (
    <>
      <Styled.PageContainer>
        {loading && page === 1 ? (
          <Loading />
        ) : (
          <>
            {issueDataArr?.map((el, idx) => {
              if (idx < 4) {
                return (
                  <IssueList
                    key={idx}
                    number={el.number}
                    title={el.title}
                    user={el.user}
                    created_at={el.created_at}
                    comments={el.comments}
                  />
                );
              } else if (idx === 4) {
                return (
                  <>
                    <AdsBox />
                    <IssueList
                      key={idx}
                      number={el.number}
                      title={el.title}
                      user={el.user}
                      created_at={el.created_at}
                      comments={el.comments}
                    />
                  </>
                );
              } else if (idx > 4) {
                return (
                  <IssueList
                    key={idx}
                    number={el.number}
                    title={el.title}
                    user={el.user}
                    created_at={el.created_at}
                    comments={el.comments}
                  />
                );
              }
            })}
          </>
        )}
        {loading && page !== 1 && <p>로딩중...</p>}
      </Styled.PageContainer>
      <div ref={loader} />
    </>
  );
};

export default MainPage;

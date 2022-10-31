import { useState, useEffect, useCallback, useRef } from 'react';
import IssueList from '../../components/IssueList';
import AdsBox from '../../components/AdsBox';
import Loading from '../../components/Loading';
import * as Styled from './style';
import { useNavigate } from 'react-router-dom';
import { useDataListState, useListDispatch, getDataList } from '../../context/IssueContext';

const MainPage = () => {
  const [issueDataArr, setIssueDataArr] = useState([]);
  const [page, setPage] = useState(1);
  const state = useDataListState();
  const dispatch = useListDispatch();
  const { data: issueDataArray, loading, error } = state.dataList;
  const loader = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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
    getDataList(dispatch, page);
  }, [page]);
  useEffect(() => {
    try {
      // getDataList(dispatch, page) //
      //.then(() => {

      if (page === 1 && !issueDataArray === false) {
        setIssueDataArr([...issueDataArray]);
        setIsLoading(false);
      } else if (!issueDataArray === false) {
        setIssueDataArr(prev => [...prev, ...issueDataArray]);
        setIsLoading(false);
      }
      //});
    } catch (e) {
      console.log(e.message);
      navigate('/');
    }
  }, [page, dispatch, loading]);

  if (error) navigate('/');

  return (
    <>
      {isLoading && <Loading />}
      <Styled.PageContainer>
        {loading && page === 1 ? (
          <Loading />
        ) : (
          <>
            <div>
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
                }
              })}
            </div>
            <div>
              {issueDataArr?.map((el, idx) => {
                if (idx > 4) {
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
            </div>
          </>
        )}
      </Styled.PageContainer>
      <div ref={loader} />
    </>
  );
};

export default MainPage;

import { useState, useEffect, useRef, useCallback } from 'react';
//import { getIssueList } from '../../api/getData';
import Loading from '../../components/Loading';
import IssueList from '../../components/IssueList';
import AdsBox from '../../components/AdsBox';
import * as Styled from './style';
import { useNavigate } from 'react-router-dom';
import { useDataListState, useListDispatch, getDataList } from '../../context/IssueContext';

const MainPage = () => {
  //const [issueDataArr, setIssueDataArr] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const state = useDataListState();
  const dispatch = useListDispatch();
  const { data: issueDataArray, loading, error } = state.dataList;
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
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  useEffect(() => {
    try {
      getDataList(dispatch, page)
        // getIssueList(page)
        .then(() => {
          //setIsLoading(true);
          console.log(issueDataArray, page);
          if (page === 1) {
            //setIssueDataArr([...issueDataArray]);
          } else {
            //setIssueDataArr(prev => [...prev, ...issueDataArray]);
          }
        })
        .then(() => {
          //setIsLoading(false);
        });
    } catch (e) {
      console.log(e.message);
      navigate('/');
    }
  }, [page]);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!issueDataArray) return null;
  return (
    <>
      <Styled.PageContainer>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div>
              {issueDataArray?.map((el, idx) => {
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
              {issueDataArray?.map((el, idx) => {
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

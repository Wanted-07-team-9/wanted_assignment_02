// import { useContext, useCallback, Fragment, useEffect, useState } from 'react'
import { useContext, Fragment, useRef, useCallback, useEffect} from 'react'
import { IssueContext } from '../contexts/IssueContextProvider'
import Container from '../container/Container'
import IssueCard from '../components/IssueCard/IssueCard'
import IssueContainer from '../container/IssueContainer'
import styled from 'styled-components'
import LoadingIndicator from '../asstes/LoadingIndicator.gif'
import ErrorSign from '../asstes/ErrorSign.png'
import Signal from '../components/Signal'

const HomePage = () => {
  const context = useContext(IssueContext)
  const {isLoading, issueData, isReachEnd, isError, pageNumberHandler} = context
  const endPoint = useRef(null)

  const observerHandler = useCallback(
    (entries, observer) => {
      if(entries[0].isIntersecting && !isLoading){
        observer.unobserve(endPoint.current);
        if(isReachEnd){
          observer.disconnect();
          return
        }
        pageNumberHandler()
      }
    }, [isLoading, isReachEnd, pageNumberHandler])

    useEffect(()=>{
      const option = {
        threshold: 0,
      }
      const observer = new IntersectionObserver(observerHandler, option);
      if(endPoint.current){
        observer.observe(endPoint.current)
      }
      return () => {
        observer && observer.disconnect()
      }},[observerHandler])

    if(isError){
      return(
        <Container>
          <IssueContainer>
          <Signal status={'에러'} imgSrc={ErrorSign} />
          </IssueContainer>
        </Container>
      )
    }
  return (
    <Container>
      <IssueContainer>
        {issueData?.map((info, index) => (
          <Fragment key={index}>
            {index === 4 &&
              <AdWrapper href='https://www.wanted.co.kr'>
                <img src='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100' alt='광고' />
              </AdWrapper>
            }
            <IssueCard number={info.number} title={info.title} user={info.user} url={info.html_url} created_at={info.created_at} comments={info.comments} key={info.id} />
          </Fragment>
        ))}
        <div ref={endPoint}></div>
        {isLoading && 
        <Signal status={'로딩 중'} imgSrc={LoadingIndicator} />}
      </IssueContainer>
    </Container>
  )
}

const AdWrapper = styled.a`
  display:flex;
  padding: 2%;
  margin-bottom: 1%;
  background-color: var(--color-white);
  border-radius: 1rem;
  img{
  }
`


export default HomePage
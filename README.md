# 프리온보딩 9팀

| <img src="https://avatars.githubusercontent.com/u/58911113?v=4" width="120" height="120" /> | <img src="https://avatars.githubusercontent.com/u/74575497?v=4" width="120" height="120" /> | <img src="https://avatars.githubusercontent.com/u/72599761?v=4" width="120" height="120"/> |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|                                           👑 권준                                           |                                           김경훈                                            |                                           김수정                                           |
|                            [@jun-05](https://github.com/jun-05)                             |                          [@tirhande](https://github.com/tirhande)                           |                        [@crystal993](https://github.com/crystal993)                        |

| <img src="https://avatars.githubusercontent.com/u/104307213?v=4" width="120" height="120"/> | <img src="https://avatars.githubusercontent.com/u/94212747?v=4" width="120" height="120" /> | <img src="https://avatars.githubusercontent.com/u/77476348?v=4"  width="120" height="120" /> | <img src="https://avatars.githubusercontent.com/u/76990149?v=4" width="120" height="120"/> |
| :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
|                                           송슬기                                            |                                           오나래                                            |                                            이창훈                                            |                                           전이진                                           |
|                          [@songseul](https://github.com/songseul)                           |                            [@NR0617](https://github.com/NR0617)                             |                 [@anotheranotherhoon](https://github.com/anotheranotherhoon)                 |                          [@pongdang](https://github.com/pongdang)                          |

## **배포링크**

[✨ 배포링크](https://wanted-07-team-9.github.io/wanted_assignment_02/)

## **프로젝트의 실행 방법**

```sh
git clone git@github.com:Wanted-07-team-9/wanted_assignment_02.git

cd wanted-pre-onboarding-frontend

npm install

npm start

open http://localhost:3000
```

## **디렉토리 구조**
```sh
wanted_assignment_02
├── public
├── src
│   ├── api             # axios 등의 호출을 위한 함수들
│   ├── assets          # 이미지 파일 폴더
│   ├── components      # 하위 컴포넌트들
│   │   ├── issueDetail
│   │   └── issues
│   ├── contexts        # context API의 provider 모음
│   ├── hooks           # 사용자 정의 Hook
│   ├── pages           # 페이지 컨테이너
│   ├── router          # 페이지 라우팅을 위한 라우터
│   ├── styles          # 공통 style을 위한 폴더
│   └── utils           # 재사용성이 높은 각종 함수들
├── App.js
└── index.js
```  

## **commit msg 규칙**

### 1. 커밋 유형 지정하기

⭐ feat : 새로운 기능에 대한 커밋

🛠 fix : 버그 수정에 대한 커밋

🧱 build : 빌드 관련 파일 수정에 대한 커밋

👏 chore : 그 외 자잘한 수정에 대한 커밋

⚒ refactor :  코드 리팩토링에 대한 커밋

🎨 style : 코드 스타일 혹은 포맷 등에 관한 커밋

✏ docs : 문서 수정에 대한 커밋

💡 ci : CI관련 설정 수정에 대한 커밋

## **코딩 컨벤션**
- 컴포넌트의 ID사용은 지양한다.  
- react의 state는 여러개 사용시 최소 집합을 찾아 사용한다.
- 컴포넌트의 이벤트에서 불필요한 익명함수를 사용하지 않는다. (예시: 함수의 인자가 event 하나인 경우)
- 코드를 설명하는 주석은 가급적 사용하지 않는다.
- 상수는 영문 대문자 스네이크 표기법(Snake case)를 사용한다.(예시: SYMBOLIC_CONSTANTS)
- 반환 값이 불린인 함수는 'is'로 시작한다
- const와 let은 사용 시점에 선언 및 할당한다.
- 함수는 사용 전에 선언해야 하며, 함수 선언문은 변수 선언문 다음에 오도록 한다.
- 이벤트 핸들러는 'on'으로 시작한다.
- 한 줄짜리 블록일 경우라도 {}를 생략하지 않으며 명확히 줄 바꿈 하여 사용한다.


## **Best Practice**

[✨ 선정 기준 #1](https://github.com/Wanted-07-team-9/wanted_assignment_02/discussions/1)

[✨ 선정 기준 #2](https://github.com/Wanted-07-team-9/wanted_assignment_02/discussions/30)

[✨ 선정 이유 #1](https://github.com/Wanted-07-team-9/wanted_assignment_02/discussions/9)  

[✨ 선정 이유 #2](https://github.com/Wanted-07-team-9/wanted_assignment_02/pull/29)


## 작업한 내용

## Assignment1. 이슈 목록 및 상세 화면 기능 구현
- **이슈 목록 화면**
<p align="center">
<img src="https://user-images.githubusercontent.com/74575497/199195259-400827da-8c80-416f-80b4-f4b8e1fcf0fd.png" width=400>
</p>

```javascript
// 다섯번째 셀 광고 이미지 출력 부분
<>
  {issueList.map((issue, index) => (
    <div key={index}>
      {index === 4 && <AdvertItem />}
      <IssueItem key={index} issue={issue} />
    </div>
  ))}
</>
```

- **Infinity Scroll 구현**

[useAxios.js](https://github.com/Wanted-07-team-9/wanted_assignment_02/blob/022fe24ad3b42f19ce504fc92bb2ef8f0d3be542/src/hooks/useAxios.js)
```javascript
// 스크롤 도중 제일 하단에 있는 lastRef를 만나면 조건에 따라 pageNum을 변경하게 되고
// useAxios.js 에서 다음 데이터를 호출하여 보여주는 형식입니다.

const observer = useRef();
const lastRef = useCallback(
  node => {
    if (isLoading) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(page + 1);
      }
    });
    if (node) {
      observer.current.observe(node);
    }
  },
  [isLoading, hasMore]
);

-- <div ref={lastRef}></div>
```

## Assignment2. Context API를 활용한 API 연동
```javascript
// Context에 불러온 이슈 리스트, 로딩 상태, 페이지 번호등과 같이 관리
// 상세 페이지에서 뒤로가기 했을때와 같이 기존 불러온 목록을 유지하기 위해 통합 관리
// Reducer로 변경
const issueReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ISSUE_LIST': {
      return {
        ...state,
        issueList: [...state.issueList, ...action.list],
        hasMore: action.hasMore,
        isLoading: action.isLoading,
      };
    }
    case 'SET_PAGE': {
      return {
        ...state,
        page: action.page,
      };
    }
    case 'SET_LOADING': {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case 'SET_ISSUE_DETAIL': {
      return {
        ...state,
        issueDetail: action.issue,
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

const IssueContext = createContext({
  issues: initialStates,
  setIssueList: () => {},
  setPage: () => {},
  setIsLoading: () => {},
  setIssueDetail: () => {},
});

export const useIssueContext = () => {
  return useContext(IssueContext);
};

function IssueProvider({ children }) {
  const [state, dispatch] = useReducer(issueReducer, initialStates);
  const setIssueList = ({ list, hasMore, isLoading }) => {
    dispatch({ type: 'SET_ISSUE_LIST', list, hasMore, isLoading });
  };
  const setPage = page => {
    dispatch({ type: 'SET_PAGE', page });
  };
  const setIsLoading = isLoading => {
    dispatch({ type: 'SET_LOADING', isLoading });
  };
  const setIssueDetail = issue => {
    dispatch({ type: 'SET_ISSUE_DETAIL', issue });
  };

  return (
    <IssueContext.Provider
      value={{
        issueList: state.issueList,
        hasMore: state.hasMore,
        isLoading: state.isLoading,
        page: state.page,
        issueDetail: state.issueDetail,
        setIssueList,
        // setInitIssueList,
        setIsLoading,
        setPage,
        setIssueDetail,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}
```
## Assignment3. 두 페이지 공통 헤더 공유
```javascript
// 헤더 컴포넌트를 따로 두어 두 페이지에 삽입
<Header />
```
## Assignment4. 에러 화면 구현
<p align="center">잘못된 페이지로 접근시 화면 (PC)</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/74575497/199195324-47a549ff-95c1-45a4-928a-f18f5e411c5c.png?raw=true" width="400"/>
</p>
<p align="center">잘못된 페이지로 접근시 화면
 (모바일)</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/74575497/199195338-28994a83-4c38-481a-9a2c-b84992af731e.png?raw=true" width="200" />
</p>


## Assignment5. 지정된 조건(open 상태, 코멘트 많은 순)에 맞게 데이터 요청 및 표시
```javascript
// params 값을 지정하여 정렬, 페이지별 데이터를 가져옵니다.
// (Open 상태는 Default: open)
getIssueList: (page, { owner, repo }) => {
  const config = {
    params: { sort: 'comments', per_page: 10, page },
  };
  return Request.get(`/repos/${owner}/${repo}/issues`, config);
},

```

## Assignment6. 반응형 웹 구현(UI는 데스크톱, 모바일에서 보았을 때 모두 읽기 편하게 구현)
<p>PC 화면</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/74575497/199195430-9460949b-7f91-4a6f-8e71-23e878e75ff0.png?raw=true" />
</p>
<p>모바일 화면</p>
<p align="center">
<img src="https://user-images.githubusercontent.com/74575497/199195438-e118315b-c2e7-430b-b45a-020ef5c14d77.png?raw=true" />
</p>
t.com/74575497/199195438-e118315b-c2e7-430b-b45a-020ef5c14d77.png">

### 그 외 기능(옵션)
- 헤더의 로고 클릭시 메인 페이지 이동 기능

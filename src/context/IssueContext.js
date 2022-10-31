import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

// Context 에서 사용 할 기본 상태
const initialState = {
  dataList: {
    loading: false,
    data: null,
    error: null,
  },
  detailPageData: {
    loading: false,
    data: null,
    error: null,
  },
};

// 로딩중일 때 바뀔 상태 객체
const loadingState = {
  loading: true,
  data: null,
  error: null,
};

// 성공했을 때의 상태 만들어주는 함수
const success = data => ({
  loading: false,
  data,
  error: null,
});

// 실패했을 때의 상태 만들어주는 함수
const error = error => ({
  loading: false,
  data: null,
  error: error,
});

// 위에서 만든 객체 / 유틸 함수들을 사용하여 리듀서 작성
function dataListReducer(state, action) {
  switch (action.type) {
    case 'GET_DATALIST':
      return {
        ...state,
        dataList: loadingState,
      };
    case 'GET_DATALIST_SUCCESS':
      return {
        ...state,
        dataList: success(action.data),
      };
    case 'GET_DATALIST_ERROR':
      return {
        ...state,
        dataList: error(action.error),
      };
    case 'GET_DETAILPAGE_DATA':
      return {
        ...state,
        detailPageData: loadingState,
      };
    case 'GET_DETAILPAGE_SUCCESS':
      return {
        ...state,
        detailPageData: success(action.data),
      };
    case 'GET_DETAILPAGE_ERROR':
      return {
        ...state,
        detailPageData: error(action.error),
      };
    default:
      throw new Error(`Unhanded action type: ${action.type}`);
  }
}

// State 용 Context 와 Dispatch 용 Context 따로 만들어주기
const DataListStateContext = createContext(null);
const ListDispatchContext = createContext(null);

// 위에서 선언한 두가지 Context 들의 Provider 로 감싸주는 컴포넌트
export function DataListProvider({ children }) {
  const [state, dispatch] = useReducer(dataListReducer, initialState);
  return (
    <DataListStateContext.Provider value={state}>
      <ListDispatchContext.Provider value={dispatch}>{children}</ListDispatchContext.Provider>
    </DataListStateContext.Provider>
  );
}

// State 를 쉽게 조회 할 수 있게 해주는 커스텀 Hook
export function useDataListState() {
  const state = useContext(DataListStateContext);
  if (!state) {
    throw new Error('Cannot find UsersProvider');
  }
  return state;
}

// Dispatch 를 쉽게 사용 할 수 있게 해주는 커스텀 Hook
export function useListDispatch() {
  const dispatch = useContext(ListDispatchContext);
  if (!dispatch) {
    throw new Error('Cannot find UsersProvider');
  }
  return dispatch;
}
// API처리 함수
export async function getDataList(dispatch, page) {
  dispatch({ type: 'GET_DATALIST' });
  try {
    const response = await axios.get(
      `https://api.github.com/repos/angular/angular-cli/issues?sort=comments&state=open&per_page=10&page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    dispatch({ type: 'GET_DATALIST_SUCCESS', data: response.data });
  } catch (e) {
    dispatch({ type: 'GET_DATALIST_ERROR', error: e });
  }
}

export async function getUser(dispatch, number) {
  dispatch({ type: 'GET_DETAILPAGE_DATA' });
  try {
    const response = await axios.get(
      `https://api.github.com/repos/angular/angular-cli/issues/${number}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    dispatch({ type: 'GET_DETAILPAGE_SUCCESS', data: response.data });
  } catch (e) {
    dispatch({ type: 'GET_DETAILPAGE_ERROR', error: e });
  }
}

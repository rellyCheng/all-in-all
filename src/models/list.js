import { queryFakeList, removeFakeList, addFakeList, updateFakeList,getArticleListByUser,getArticleListByUserHavePage,getMyStarArticles } from '@/services/api';

export default {
  namespace: 'list',

  state: {
    list: [],
    myStarArticles:{}
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *getArticleListByUser(_,{call,put}){
      const response = yield call(getArticleListByUser);
      console.log(response.data);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },

    *getMyStarArticles({payload},{call,put}){
      const response = yield call(getMyStarArticles,payload);
      console.log(response.data);
      yield put({
        type: 'saveMyStarArticles',
        payload: response.data,
      });
    },

    *getArticleListByUserHavePage({ payload },{call,put}){
      const response = yield call(getArticleListByUserHavePage, payload);
      console.log(response.data);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
   
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
    saveMyStarArticles(state,{payload}){
      return {
        ...state,
        myStarArticles: payload,
      };
    }
  },
};

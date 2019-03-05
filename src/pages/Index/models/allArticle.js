import { getAllArticleListMore,fetchLikeArticle,fetchStarArticle,fetchArticleByTitle } from '@/services/api';
import {message} from 'antd';
import router from 'umi/router';


export default {
  namespace: 'allArticle',

  state: {
    list: [],
    pageCurrent:1,
    articleId:null,
    articleFilter:{}
  },

  effects: {

    *getAllArticleListMore({ payload },{call,put}){
      const response = yield call(getAllArticleListMore, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data.pageData) ? response.data.pageData : [],
      });
      yield put({
        type: 'articleFilter',
        payload:payload.articleFilter,
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(getAllArticleListMore, payload);
      if(response.data.pageData.length>0){
        yield put({
          type: 'appendList',
          payload: Array.isArray(response.data.pageData) ? response.data.pageData : [],
        });
      }else{
        message.info('没有更多了！')
      }
    },
    *fetchLikeArticle({ payload,callback },{call,put}){
      const response = yield call(fetchLikeArticle, payload);
      if(response.state=="OK"){
        callback(response); // 返回结果
      }
    },
    
    *fetchStarArticle({ payload,callback },{call,put}){
      const response = yield call(fetchStarArticle, payload);
      if(response.state=="OK"){
        callback(response); // 返回结果
      }
    },
    *fetchArticleByTitle({ payload },{call,put}){
      const response = yield call(fetchArticleByTitle, payload);
      if(response.state=="OK"){
        yield put({
          type: 'queryList',
          payload: Array.isArray(response.data.pageData) ? response.data.pageData : [],
        });
      }
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    articleFilter(state, action) {
        return {
          ...state,
          articleFilter: action.payload,
        };
      },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
        pageCurrent:state.pageCurrent+1
      };
    },
  },
};

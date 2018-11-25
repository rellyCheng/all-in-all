import { getMyArticleListMore, saveArticle } from '@/services/api';
import {message} from 'antd';


export default {
  namespace: 'myArticle',

  state: {
    list: [],
    pageCurrent:1,
    articleId:null
  },

  effects: {

    *getMyArticleListMore({ payload },{call,put}){
      const response = yield call(getMyArticleListMore, payload.pageCurrent);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data.pageData) ? response.data.pageData : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(getMyArticleListMore, payload.pageCurrent);
      if(response.data.pageData.length>0){
        yield put({
          type: 'appendList',
          payload: Array.isArray(response.data.pageData) ? response.data.pageData : [],
        });
      }else{
        message.info('没有更多了！')
      }
    },
    *save({ payload },{call,put}){
      const response = yield call(saveArticle, payload);
     console.log(response);
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
        pageCurrent:state.pageCurrent+1
      };
    },
  },
};
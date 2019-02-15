import { articleDetail,fetchArticleComment } from '@/services/api';
import {message} from 'antd';

export default {
  namespace: 'articleDetail',

  state: {
    articleId:null,
    articleComment:[]
  },

  effects: {
    *articleDetail({ payload },{call,put}){
        const { resolve,params } = payload;
        const response = yield call(articleDetail, params);
        console.log(response);
        !!resolve && resolve(response); // 返回数据
    },
    
    *fetchArticleComment({ payload },{call,put}){
      const response = yield call(fetchArticleComment, payload);
      if(response.state=="OK"){
        yield put({
          type: 'saveArticleComment',
          payload: response.data,
        });
      }
  },
  },

  reducers: {
    articleDetail(state, action) {
        console.log(action)
      return {
        ...state,
        articleDetail: action
      };
    },
    saveArticleComment(state,{payload}){
      return {
        ...state,
        articleComment:payload
      };
    },
  },
};

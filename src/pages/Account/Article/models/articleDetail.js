import { articleDetail } from '@/services/api';
import {message} from 'antd';

export default {
  namespace: 'articleDetail',

  state: {
    articleId:null
  },

  effects: {
    *articleDetail({ payload },{call,put}){
        const { resolve,params } = payload;
        const response = yield call(articleDetail, params);
        console.log(response);
        !!resolve && resolve(response); // 返回数据
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
  },
};

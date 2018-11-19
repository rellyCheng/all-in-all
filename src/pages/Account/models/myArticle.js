import { getMyArticleListMore } from '@/services/api';

export default {
  namespace: 'myArticle',

  state: {
    list: [],
    pageCurrent:1
  },

  effects: {

    *getMyArticleListMore({ payload },{call,put}){
      const response = yield call(getMyArticleListMore, payload.pageCurrent);
      console.log(response.data);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
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
  },
};

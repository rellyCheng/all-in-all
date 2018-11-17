import { query as queryUsers, queryCurrent,updateUserDetail,updateTags } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      console.log(response)
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
    *updateUserDetail({ payload }, { call }) {
      const response = yield call(updateUserDetail,payload);
    },

    *updateTags({ payload }, { call }) {
      const { resolve,params } = payload;
      const response = yield call(updateTags,params);
      resolve(response); // 返回数据
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};

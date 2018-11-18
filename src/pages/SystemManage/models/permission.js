import { queryPermissionList, fetchTranslate } from '@/services/api';

export default {
  namespace: 'permission',

  state: {
    permissionList: [],
    parentPermissionList: [],
    translateValue: '',
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryPermissionList, payload);
      yield put({
        type: 'show',
        payload: response.data,
      });
    },
    *getParentPermissionList({ payload }, { call, put }) {
      const response = yield call(getParentPermissionList, payload);
      console.log(response);
      yield put({
        type: 'parent',
        payload: response.data,
      });
    },
    *fetchTranslate({ payload }, { call, put }) {
      const response = yield call(fetchTranslate, payload);
      if (typeof response != 'undefined') {
        yield put({
          type: 'translate',
          payload: response.trans_result[0].dst,
        });
      }
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
        permissionList: payload.pageData,
      };
    },
    parent(state, { payload }) {
      return {
        parentPermissionList: payload,
      };
    },
    translate(state, { payload }) {
      return {
        translateValue: payload,
      };
    },
  },
};

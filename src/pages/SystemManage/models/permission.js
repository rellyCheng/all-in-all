import { queryPermissionList, fetchTranslate,getParentPermissionList,addPermission } from '@/services/api';

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
      if(response.state=='OK'){
        yield put({
          type: 'parent',
          payload: response.data,
        });
      }
     
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
    *addPermission({ payload }, { call, put }) {
      const {resolve,values} = payload;
      const response = yield call(addPermission, values);
      if(response.state=='OK'){
        resolve(response); // 返回数据
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
        ...state,
        parentPermissionList: payload,
      };
    },
    translate(state, { payload }) {
      return {
        ...state,
        translateValue: payload,
      };
    },
  },
};

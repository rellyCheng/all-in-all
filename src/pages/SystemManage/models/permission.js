import { queryPermissionList} from '@/services/api';

export default {
  namespace: 'permission',

  state: {
    permissionList:[]
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryPermissionList,payload);
      yield put({
        type: 'show',
        payload: response.data,
      });
    },
   
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
        permissionList:payload.pageData
      };
    },
  },
};

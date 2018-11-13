import { queryPermissionList} from '@/services/api';

export default {
  namespace: 'permission',

  state: {
    permissionList:[],
    parentPermissionList:[]
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryPermissionList,payload);
      yield put({
        type: 'show',
        payload: response.data,
      });
    },
    *getParentPermissionList({ payload }, { call, put }) {
      const response = yield call(getParentPermissionList,payload);
      console.log(response)
      yield put({
        type: 'parent',
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
    parent(state, { payload }) {
      return {
       parentPermissionList:payload
      };
    },
  },
};

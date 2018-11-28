import { queryRoleList,addRole} from '@/services/api';
export default {
  namespace: 'role',

  state: {
    roleList:[],
    openAddRoleForm:true
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryRoleList,payload);
      if(response.state=='OK'){
        yield put({
          type: 'show',
          payload: response.data,
        });
      }
    },

    *addRole({ payload }, { call }) {
        const { resolve,params } = payload;
        const response = yield call(addRole,params);
        !!resolve && resolve(response); // 返回数据
        
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
        roleList:payload.pageData,
      };
    },
  },
};

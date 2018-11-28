import { queryRoleList,addRole,getPermissionByRole,addPermissionForRole,getUserByRole,addUserForRole} from '@/services/api';
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

    *getPermissionByRole({ payload }, { call }) {
      const { resolve,params } = payload;
      const response = yield call(getPermissionByRole,params);
      !!resolve && resolve(response); // 返回数据
    },

    *getUserByRole({ payload }, { call }) {
      const { resolve,params } = payload;
      const response = yield call(getUserByRole,params);
      !!resolve && resolve(response); // 返回数据
    },

    *addPermissionForRole({ payload }, { call }) {
      const { resolve,params } = payload;
      const response = yield call(addPermissionForRole,params);
      !!resolve && resolve(response); // 返回数据
    },

    *addUserForRole({ payload }, { call }) {
      console.log(payload)
      const { resolve,params } = payload;
      const response = yield call(addUserForRole,params);
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

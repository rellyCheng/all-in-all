import { queryUserList,addUser} from '@/services/api';
import { pagpaginatione} from '@/utils/utils';
export default {
  namespace: 'sysUser',

  state: {
    userList:[],
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryUserList,payload);
      if(response.state=='OK'){
        yield put({
          type: 'show',
          payload: response.data,
        });
      }
    },

    *addUser({ payload }, { call }) {
      const { resolve,params } = payload;
      const response = yield call(addUser,params);
      !!resolve && resolve(response); // 返回数据
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        ...payload,
        userList:payload.pageData,
      };
    },
  },
};

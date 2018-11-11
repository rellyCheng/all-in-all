import { queryUserList} from '@/services/api';
import { pagpaginatione} from '@/utils/utils';
export default {
  namespace: 'sysUser',

  state: {
    userList:[]
  },

  effects: {
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryUserList,payload);
   
      yield put({
        type: 'show',
        payload: response.data,
      });
    },
   
  },

  reducers: {
    show(state, { payload }) {
    const pageCurrent = payload.pageCurrent;
      return {
        ...state,
        ...payload,
        userList:payload.pageData,
        // pagination: pagpaginatione(payload, (pageCurrent) => {
        //     _this.params.pageCurrent = pageCurrent;
        //     _this.requestList(page);
        // })
      };
    },
  },
};

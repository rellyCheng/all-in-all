import { fakeRegister,getAddressByIp } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import router from 'umi/router';
import token from '@/utils/token';
import {message} from 'antd';


export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      if(response.state=="OK"){
        token.save(response.data.token);
        message.success("注册成功！三秒后跳转！")
        setTimeout(() => {
          router.push(`/account/center`)},3000
        );
       
        yield put({
          type: 'registerHandle',
          payload: response,
        });
      }
    },
    *getAddressByIp({ _ }, { call, put }) {
      const response = yield call(getAddressByIp);
      console.log(response)
      yield put({
        type: 'ipInfo',
        payload: response.data,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority('user');
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
    ipInfo(state, { payload }) {
      return {
        ...state,
        province: payload.region,
        city:payload.city,
        provinceId:payload.region_id,
        cityId:payload.city_id,
        ip:payload.ip,
        country:payload.country
      };
    },
  },
};

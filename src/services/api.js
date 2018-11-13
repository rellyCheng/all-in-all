import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  let formData = new FormData();
  formData.append('userName', params.userName);
  formData.append('password', params.password);
  return request('/api/login/accountLogin', {
    method: 'POST',
    body: formData,
  });
}
export async function fakeLogout() {
  return request('/api/logout', {
    method: 'POST',
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function queryPermissionList(params) {
  let formData = new FormData();
  formData.append('pageCurrent', params.pageCurrent);
  formData.append('pageSize', params.pageSize);
  return request(`/api/permission/getPermissionList`, {
    method: 'POST',
    body: formData,
  });
}

export async function queryUserList(params) {
  let formData = new FormData();
  formData.append('pageCurrent', params.pageCurrent);
  formData.append('pageSize', params.pageSize);
  return request(`/api/user/getUserList`, {
    method: 'POST',
    body: formData,
  });
}

export async function getParentPermissionList(params) {
  let formData = new FormData();
  formData.append('pageCurrent', params.type);
  return request(`/api/permission/getParentPermissionList`, {
    method: 'POST',
    body: formData,
  });
}

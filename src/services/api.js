import { stringify } from 'qs';
import request from '@/utils/request';
import MD5 from '@/utils/md5';
import jsonp from 'fetch-jsonp';

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
  return request('/publicApi/login/accountLogin', {
    method: 'POST',
    body: formData,
  });
}
export async function fakeLogout() {
  return request('/publicApi/logout', {
    method: 'POST',
  });
}

// export async function fakeRegister(params) {
//   return request('/api/register', {
//     method: 'POST',
//     body: params,
//   });
// }

export async function fakeRegister(params) {
  return request('/publicApi/register', {
    method: 'POST',
    body: params,
  });
}

// export async function queryNotices() {
//   return request('/api/notices');
// }
export async function queryNotices() {
  return request('/api/notice/getNoticeList',{
    method:'POST'
  });
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

//User
export async function queryUserList(params) {
  let formData = new FormData();
  formData.append('pageCurrent', params.pageCurrent);
  formData.append('pageSize', params.pageSize);
  return request(`/api/user/getUserList`, {
    method: 'POST',
    body: formData,
  });
}

export async function addUser(params) {
  return request(`/api/user/registUser`, {
    method: 'POST',
    body: params,
  });
}

export async function getParentPermissionList(params) {
  return request(`/api/permission/getParentPermissionList?type=${params}`, {
    method: 'POST',
  });
}

export async function fetchTranslate(params) {
  let sign = MD5.MD5('20181117000235668' + params + '123' + 'N4GXy6lTXoWM1TkLRTVt');
  const q = params;
  const from = 'zh';
  const to = 'en';
  const appid = '20181117000235668';
  const salt = '123';
  return jsonp(
    `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${params}&from=${from}&to=${to}&appid=${appid}&salt=${salt}&sign=${sign}`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      return json;
    })
    .catch(function(ex) {
      console.log('parsing failed', ex);
    });
}

export async function addPermission(params) {
  return request(`/api/permission/addPermission`, {
    method: 'POST',
    body: params,
  });
}

export async function getArticleListByUser(params) {
  return request(`/api/article/getArticleListByUser`, {
    method: 'POST',
    body: params,
  });
}

export async function getMyArticleListMore(params){
  return request(`/api/article/getMyArticleListMore?pageCurrent=${params}`,{
    method:'POST'
  })
}

export async function saveArticle(params){
  return request(`/api/article/save`,{
    method:'POST',
    body:params
  })
}

export async function articleDetail(params){
  return request(`/api/article/getArticleDetail?articleId=${params}`,{
    method:'POST',
  })
}

export async function addRole(params){
  return request(`/api/role/addRole`,{
    method:'POST',
    body:params
  })
}

export async function queryRoleList(params){
  return request(`/api/role/getRoleList?pageCurrent=${params.pageCurrent}&pageSize=${params.pageSize}`,{
    method:'POST'
  })
}

export async function getPermissionByRole(params){
  return request(`/api/role/getPermissionByRole?roleId=${params}`,{
    method:'POST'
  })
}

export async function addPermissionForRole(params){
  let formData = new FormData();
  formData.append('addPermissions', params.addPermissions);
  formData.append('deletePermissions', params.deletePermissions);
  formData.append('roleId', params.roleId);
  return request(`/api/role/addPermissionForRole`,{
    method:'POST',
    body:formData
  })
}

export async function getUserByRole(params){
  return request(`/api/role/getUserByRole?roleId=${params}`,{
    method:'POST'
  })
}

addUserForRole
export async function addUserForRole(params){
  let formData = new FormData();
  formData.append('addUsers', params.addUsers);
  formData.append('deleteUsers', params.deleteUsers);
  formData.append('roleId', params.roleId);
  return request(`/api/role/addUserForRole`,{
    method:'POST',
    body:formData
  })
}

export async function getAddressByIp() {
  return request(`/service/getIpInfo2.php?ip=myip`,{
    method:'POST',
  })
}
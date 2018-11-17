import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/user/currentUser',{
    method: 'POST',
  });
}

// export async function queryCurrent() {
//   return request('/api/currentUser',{
//     method: 'GET',
//   });
// }

export async function updateUserDetail(params) {
  return request(`/api/user/updateUserDetail`, {
    method: 'POST',
    body: params,
  });
}

export async function updateTags(params) {
  console.log(params)
  return request(`/api/user/updateTags?tag=`+params, {
    method: 'POST',
  });
}

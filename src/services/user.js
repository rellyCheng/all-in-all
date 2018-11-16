import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/user/currentUser',{
    method: 'POST',
  });
}

export async function updateUserDetail(params) {
  return request(`/api/updateUserDetail`, {
    method: 'POST',
    body: params,
  });
}

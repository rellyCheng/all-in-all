import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function updateUserDetail(params) {
  return request(`/api/user/updateUserDetail`, {
    method: 'POST',
    body: params,
  });
}

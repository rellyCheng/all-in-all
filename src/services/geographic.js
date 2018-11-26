import request from '@/utils/request';

export async function queryProvince() {
  return request('/api/geographic/province', {
    method: 'POST',
  });
}

// export async function queryCity(province) {
//   return request(`/api/geographic/city/${province}`);
// }

export async function queryCity(province) {
  return request(`/api/geographic/city?pid=${province}`, {
    method: 'POST',
  });
}

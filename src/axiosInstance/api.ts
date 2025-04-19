import axios from './index';

export const baseUrl = '/eco-eods';
const { host, protocol } = window.location;

// const wsServer =
//   process.env.NODE_ENV === 'development'
//     ? `${protocol === 'https:' ? 'wss' : 'wss'}://alpha-poseidon.supreium.com${POSEIDON_WSPATH}`
//     : `${protocol === 'https:' ? 'wss' : 'ws'}://${host}${POSEIDON_WSPATH}`;
const wsGlobalServer =
  process.env.NODE_ENV === 'development'
    ? `${protocol === 'https:' ? 'wss' : 'wss'}://k8s.supreium.com/k8s/172.16.251.184/ws-global`
    : `${protocol === 'https:' ? 'wss' : 'ws'}://${host}/ws-global`;

export const apiGlobalWs = `${wsGlobalServer}`;

// 用户信息
export async function getUserData() {
  return axios(`${baseUrl}/manager/user/get`, {
    method: 'GET',
  });
}
// 用户账号list
export async function getListOfUser() {
  return axios(`${baseUrl}/manager/user/listOfUser`, {
    method: 'GET',
  });
}
/** Verification Code */
export async function getCode() {
  return axios(`${baseUrl}/manager/user/captcha?d=${Math.random()}`, {
    method: 'GET',
  });
}
export async function slideCheck(data: any) {
  return axios(`${baseUrl}/user/slideCheck`, {
    method: 'POST',
    data,
  });
}

export async function loginUser(data: any) {
  return axios(`${baseUrl}/manager/user/login`, {
    method: 'POST',
    data,
  });
}
export async function logout() {
  return axios(`${baseUrl}/manager/user/logout`, {
    method: 'POST',
  });
}

export const getOrderList = async (
  pageNumber: number,
  pageSize: number,
  searchTerm?: { [key: string]: string | number | boolean | null },
  sort?: string,
  order?: string,
) => {
  const data = await axios(`${baseUrl}/manager/order/getOrderList`, {
    method: 'GET',
    data: {
      pageNumber,
      pageSize,
      sort,
      order,
      ...searchTerm,
    },
  });
  return Promise.resolve(data);
};
export default {};

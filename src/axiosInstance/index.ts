import Axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { message } from 'antd';

import NProgress from 'nprogress'; // progress bar
import { getStorage, removeStorage } from '@/utils/utils';
// import 'nprogress/nprogress.css'; // progress bar style

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: '/',
  timeout: 500000,
  responseType: 'json',
});
// Axios.defaults.timeout = 20 * 1000;
// Axios.defaults.responseType = 'json';

NProgress.configure({
  showSpinner: false,
});

interface ReqConfig extends AxiosRequestConfig {
  meta?: {
    auth?: boolean;
    noToken?: boolean;
  };
}
// HTTP request拦截
axiosInstance.interceptors.request.use(
  (config: ReqConfig) => {
    NProgress.start(); // start progress bar
    const meta = config.meta || {};
    // config.headers['Content-Disposition'] = 'inline'
    // config.headers['content-type'] = 'video/mp4'
    const noToken = meta.noToken === true; // 是否需要token
    if (getStorage({ name: 'token' }) && !noToken) {
      config.headers.Authorization = getStorage({ name: 'token' });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// HTTP response拦截
axiosInstance.interceptors.response.use(
  (res) => {
    NProgress.done();
    // res.headers['content-type'] = 'video/mp4'
    if (res.data.code != 200) {
      res.data.msg ? message.error(res.data.msg) : null;
    }
    return res.data;
  },
  (error) => {
    NProgress.done();
    if (error.response && error.response.status) {
      const { status } = error.response;
      const msg = error.response.msg || '未知错误';
      // 如果在白名单里则自行catch逻辑处理
      switch (status) {
        case 401:
          message.warning('请重新登录');
          window.location.hash = '#/login';
          break;
        default:
          message.error(msg);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

import axios from 'axios';
// import store from 'store/index';
import store from '@/store/index';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/',
});

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    // 这些请求是不需要加appkey的
    if (config.url.includes('/passport')) {
      return config;
    }
    // 这种写法会报错TypeError: Cannot set properties of undefined (setting 'appkey')
    // const copy = config;
    // copy.params.appkey = store.state.user.appkey;
    // return config;

    return {
      ...config,
      params: {
        ...config.params,
        appkey: store.state.user.appkey,
      },
    };
  },
  (error) => Promise.reject(error),
);

// 响应拦截
instance.interceptors.response.use(
  (response) => {
    if (response.data.status === 'fail') {
      return Promise.reject(response.data.msg);
    }
    return response.data.data;
  },
  (error) => Promise.reject(error),
);

export default instance;

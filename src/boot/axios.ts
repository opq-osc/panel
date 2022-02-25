import { boot } from 'quasar/wrappers';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoadingBar } from 'quasar';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: '/v1/' });

api.interceptors.request.use(
  async (request) => {
    LoadingBar.start();
    return Promise.resolve(request);
  },
  async (error) => {
    LoadingBar.stop();
    return Promise.reject(error);
  }
);

api.interceptors.response.use(async (response: AxiosResponse) => {
  LoadingBar.stop();
  return Promise.resolve(response.data);
},
  async (error: AxiosError) => {
    LoadingBar.stop();
    return Promise.reject(error.response?.data);
  }
);


export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };

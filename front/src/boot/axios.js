import { boot } from 'quasar/wrappers'
import axios from 'axios';

import { postStore } from "../stores/post.store";


const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : 'https://promo-qag1.onrender.com/api'

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {'Content-Type': 'multipart/form-data'}
})



api.interceptors.request.use(function (config) {
  const store = postStore();
  store.setLoading(true);
  return config;
}, function (error) {
  return Promise.reject(error);
});

api.interceptors.response.use(
  res => {
    const store = postStore();
    store.setLoading(false);
    return res.data
  },
  err => {
    const store = postStore();

    if([400].includes(err.response.status)){
      const { errors } =  err.response.data
      const items = errors.map(err => ({
        field: err.path,
        message: err.msg
      }))
      store.setErrors(items);
      store.setLoading(false);
    }

    if (err.response && typeof err.response.data === "string") {
      return throwBackendError(err);
    } else {
      return Promise.reject(err);
    }
  }
)

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api }

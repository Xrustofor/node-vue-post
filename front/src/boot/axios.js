import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:3000/api' })

api.interceptors.response.use(
  res => res.data,
  err => {
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

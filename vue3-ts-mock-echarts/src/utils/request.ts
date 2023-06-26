import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/login/Login'

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000 * 10,
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.token = userStore.token
  }
  // 设置请求头

  return config
})
request.interceptors.response.use(
  (res) => {
    if (res.data.code !== 200) {
      ElMessage({
        type: 'error',
        message: res.data.data,
      })
      return ''
    }
    return res.data
  },
  (err) => {
    // http状态码
    // statusCode = 200, 201, 202, 204, 400, 401, 403, 404, 408, 409, 410, 422, 500
    let status = err.response.status
    let message: {
      [t: string]: string
    } = {
      '401': '账户已过期',
      '403': '无权访问',
      '404': '请求地址错误',
      '500': '服务器问题',
    }
    // 处理网络错误
    ElMessage.error(message[status] || '网络错误')
    return Promise.reject(err)
  },
)
export default request

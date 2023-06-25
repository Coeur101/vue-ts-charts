import request from '@/utils/request'
import { LOGIN_RES_DATA, LOGIN_INFO, USER_RES_DATA, LOGOUT } from './type'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
export function reqLogin<T>(data: LOGIN_INFO) {
  return request<T, LOGIN_RES_DATA>({
    url: API.LOGIN_URL,
    method: 'post',
    data,
  })
}
export function reqUserInfo<T>() {
  return request<T, USER_RES_DATA>({ url: API.USERINFO_URL, method: 'get' })
}
/* 退出登录 */
export function reqLogOut<T>() {
  return request<T, LOGOUT>({ url: API.LOGOUT_URL, method: 'post' })
}

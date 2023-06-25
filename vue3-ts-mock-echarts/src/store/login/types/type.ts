import { USER_INFO } from '@/api/user/type'
import { RouteRecordRaw } from 'vue-router'

export interface USER_STATE {
  token?: string | null
  menuRoutes: RouteRecordRaw[]
  userInfo: USER_INFO | null
}

import { GENERAL_STATUS_TYPE } from '@/types'

export interface LOGIN_INFO {
  username: string
  password: string
}
export interface LOGIN_RES_DATA extends GENERAL_STATUS_TYPE {
  data: string
}

export interface USER_INFO {
  routes: string[]
  buttons: string[]
  roles: string[]
  name: string
  avatar: string
}

export interface USER_RES_DATA extends GENERAL_STATUS_TYPE {
  data: USER_INFO
}
export interface LOGOUT extends GENERAL_STATUS_TYPE {
  data: string | null
}

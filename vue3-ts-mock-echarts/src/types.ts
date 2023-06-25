// 定义所有接口需要继承的类型
export interface GENERAL_STATUS_TYPE {
  code: number
  message: string
  ok: boolean
}
export interface GENERAL_PAGE_TYPE {
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}

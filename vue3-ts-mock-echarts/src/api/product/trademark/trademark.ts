// 书写品牌管理模块接口
import request from '@/utils/request'
import { TRADEMARK_LIST, TRADEMARK_RES } from './type'

enum API {
  // 获取已有的品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌信息
  ADD_TRADEMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌信息
  UPDATE_TRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌
  DELETE_TRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}
/**
 * 获取当前已有的品牌个数
 * @param page 当前页码
 * @param limit 获取的个数
 * @returns
 */
// 获取已有的品牌接口方法
export const reqHasTrademark = <T>(page: number, limit: number) => {
  return request.get<T, TRADEMARK_RES>(API.TRADEMARK_URL + `${page}/${limit}`)
}
export const reqAddOrUpdateTrademark = <T>(data: TRADEMARK_LIST) => {
  if (data.id) {
    return request.put<T, TRADEMARK_RES>(API.UPDATE_TRADEMARK_URL, data)
  } else {
    return request.post<T, TRADEMARK_RES>(API.ADD_TRADEMARK_URL, data)
  }
}
/**
 * 删除已有品牌
 * @param id 品牌id
 * @returns
 */
export const reqDelTrademark = <T>(id: number) => {
  return request.delete<T, TRADEMARK_RES>(`${API.DELETE_TRADEMARK_URL}+${id}`)
}

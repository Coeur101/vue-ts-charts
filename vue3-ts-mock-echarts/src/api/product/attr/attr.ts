import request from '@/utils/request'
import { ATTR_DATA, ATTR_LIST, CATEGORY_DATA } from './type'
enum API {
  GET_CATEGORY1_URL = '/admin/product/getCategory1', //获取一级分类接口
  GET_CATEGORY2_URL = '/admin/product/getCategory2/', //获取二级分类接口
  GET_CATEGORY3_URL = '/admin/product/getCategory3/', //获取三级分类接口
  // 获取分类下的已有属性和属性值
  GET_ATTR_URL = '/admin/product/attrInfoList/',
  POST_ATTR_VALUE_URL = '/admin/product/saveAttrInfo', // 添加或修改属性与属性值
  // 删除属性
  DEL_ATTR_URL = '/admin/product/deleteAttr/',
}

export const reqCategory = <T>(id?: number, index: number = 1) => {
  return request.get<T, CATEGORY_DATA>(
    index != 1
      ? (API as any)[`GET_CATEGORY${index}_URL`] + `${id}`
      : API[`GET_CATEGORY${index}_URL`],
  )
}
export const reqAttr = <T>(
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
) => {
  return request.get<T, ATTR_DATA>(API.GET_ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`)
}
export const reqAddAttrOrUpdate = <T>(data: ATTR_LIST) => {
  return request.post<T, any>(API.POST_ATTR_VALUE_URL, data)
}
export const reqDelAttr = <T>(id: number | string) => {
  return request.delete<T, any>(API.DEL_ATTR_URL + `${id}`)
}

import request from '@/utils/request'
import { CATEGORY_DATA } from './type'
enum API {
  GET_CATEGORY1_URL = '/admin/product/getCategory1', //获取一级分类接口
  GET_CATEGORY2_URL = '/admin/product/getCategory2/', //获取二级分类接口
  GET_CATEGORY3_URL = '/admin/product/getCategory3/', //获取三级分类接口
}

export const reqCategory = <T>(id?: number, index: number = 1) => {
  return request.get<T, CATEGORY_DATA>(
    index != 1
      ? (API as any)[`GET_CATEGORY${index}_URL`] + `${id}`
      : API[`GET_CATEGORY${index}_URL`],
  )
}

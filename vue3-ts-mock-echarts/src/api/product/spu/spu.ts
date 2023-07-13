import request from '@/utils/request'
import { RES_SPU_LIST } from './type'

enum API {
  GET_SPU_LIST = '/admin/product/',
}
export const reqSPUList = <T>(
  pageNum: number,
  pageSize: number,
  category3Id: number | string,
) => {
  return request.get<T, RES_SPU_LIST>(
    API.GET_SPU_LIST + `${pageNum}/${pageSize}?category3Id=${category3Id}`,
  )
}

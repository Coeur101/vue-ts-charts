import { GENERAL_PAGE_TYPE, GENERAL_STATUS_TYPE } from '@/types'

export interface SPU {
  id?: number
  spuName: string
  description: string
  category3Id: number
  tmId: number
  spuSaleAttrList?: any
  spuImageList?: any
}

export interface SPU_DATA extends GENERAL_PAGE_TYPE {
  records: SPU[]
}

export interface RES_SPU_LIST extends GENERAL_STATUS_TYPE {
  data: SPU_DATA
}

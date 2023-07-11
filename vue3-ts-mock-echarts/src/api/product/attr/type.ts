import { GENERAL_STATUS_TYPE } from '@/types'
export interface CATEGORY_LIST {
  id: number
  name: string
}

export interface CATEGORY_DATA extends GENERAL_STATUS_TYPE {
  data: CATEGORY_LIST[]
}
export interface ATTR_VALUE_LIST {
  id?: number
  valueName?: string
  attrId?: number
}

export interface ATTR_LIST {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList?: ATTR_VALUE_LIST[]
}

export interface ATTR_DATA extends GENERAL_STATUS_TYPE {
  data: ATTR_LIST[]
}

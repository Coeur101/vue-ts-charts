import { GENERAL_STATUS_TYPE } from '@/types'
export interface CATEGORY_LIST {
  id: number
  name: string
}

export interface CATEGORY_DATA extends GENERAL_STATUS_TYPE {
  data: CATEGORY_LIST[]
}

import { GENERAL_PAGE_TYPE, GENERAL_STATUS_TYPE } from '@/types'

export interface TRADEMARK_LIST {
  id?: number
  tmName?: string
  logoUrl?: string
}

export interface TRADEMARK_DATA extends GENERAL_PAGE_TYPE {
  records: TRADEMARK_LIST[]
}

export interface TRADEMARK_RES extends GENERAL_STATUS_TYPE {
  data: TRADEMARK_DATA | undefined
}

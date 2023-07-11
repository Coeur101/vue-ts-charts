import { CATEGORY_LIST } from '@/api/product/attr/type'

export interface CATEGORY {
  category1: any
  category2: any
  category3: any
}
export interface CATEGORY_ID {
  category1Id: number | string
  category2Id: number | string
  category3Id: number | string
}
export type CATEGORY_OPTION_TYPE = {
  [key in keyof CATEGORY]: CATEGORY_LIST[]
} & CATEGORY_ID

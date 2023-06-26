import { CATEGORY_LIST } from '@/api/product/attr/type'

export interface CATEGORY {
  category1: any
  category2: any
  category3: any
}
export type CATEGORY_OPTION_TYPE = {
  [key in keyof CATEGORY]: CATEGORY_LIST[]
}

import { defineStore } from 'pinia'
import { CATEGORY_OPTION_TYPE } from '../types/category_type'
import { reqCategory } from '@/api/product/attr/attr'

let useCategoryStore = defineStore('categoryStore', {
  state: () =>
    <CATEGORY_OPTION_TYPE>{
      category1: [],
      category2: [],
      category3: [],
      category1Id: '',
      category2Id: '',
      category3Id: '',
    },
  actions: {
    async getCategory(id?: number, index: number = 1) {
      const result = await reqCategory(id, index)
      if (result) {
        ;(this as any)[`category${index}`] = result.data
      }
    },
  },
})
export default useCategoryStore

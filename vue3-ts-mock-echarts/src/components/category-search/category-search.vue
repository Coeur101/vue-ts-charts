<script setup lang="ts">
import { CATEGORY } from '@/store/global/types/category_type'
import useCategoryStore from '@/store/global/category/category'
const categoryStore = useCategoryStore()
type CATEGORY_TYPE_PARAMS = {
  [key in keyof CATEGORY]: number | string
}
const categoryParams = reactive<CATEGORY_TYPE_PARAMS>({
  category1: '',
  category2: '',
  category3: '',
})

const getCategory = async (index: number) => {
  // 每次改变下拉列表后，就将后面的所有下拉列表的内容清空
  for (let i = index + 1; i <= Object.keys(categoryParams).length; i++) {
    ;(categoryParams as any)[`category${i}`] = ''
  }
  // 每次请求下一个页面的数据
  categoryStore.getCategory(
    (categoryParams as any)[`category${index}`],
    index + 1,
  )
}
onMounted(() => {
  categoryStore.getCategory()
})
</script>
<template>
  <el-form inline :model="categoryParams">
    <el-form-item label="一级分类">
      <el-select
        clearable
        v-model="categoryParams.category1"
        filterable
        @change="getCategory(1)"
      >
        <el-option
          v-for="item in categoryStore.category1"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        clearable
        v-model="categoryParams.category2"
        filterable
        @change="getCategory(2)"
      >
        <el-option
          v-for="item in categoryStore.category2"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select clearable v-model="categoryParams.category3" filterable>
        <el-option
          v-for="item in categoryStore.category3"
          :key="item.id"
          :value="item.id"
          :label="item.name"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import useCategoryStore from '@/store/global/category/category'
defineProps<{
  isDisabled: number
}>()
const categoryStore = useCategoryStore()
const emit = defineEmits(['sendCatgoryId', 'sendAttrButton'])
const getCategory = async (index: number) => {
  if (index == 3) {
    emit('sendCatgoryId')
  } else {
    // 每次改变下拉列表后，就将后面的所有下拉列表的内容清空
    for (
      let i = index + 1;
      i <= Object.keys(categoryStore.$state).length;
      i++
    ) {
      ;(categoryStore as any)[`category${i}Id`] = ''
    }
    emit('sendAttrButton')
    // 每次请求下一个页面的数据
    categoryStore.getCategory(
      (categoryStore as any)[`category${index}Id`],
      index + 1,
    )
  }
}
onMounted(() => {
  categoryStore.getCategory()
})
</script>
<template>
  <el-form :disabled="isDisabled ? true : false" inline>
    <el-form-item label="一级分类">
      <el-select
        clearable
        v-model="categoryStore.category1Id"
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
        v-model="categoryStore.category2Id"
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
      <el-select
        clearable
        v-model="categoryStore.category3Id"
        filterable
        @change="getCategory(3)"
      >
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

<script setup lang="ts">
import CategorySearch from '@/components/category-search/category-search.vue'
</script>
<template>
  <el-card shadow="always">
    <CategorySearch></CategorySearch>
  </el-card>

  <el-card shadow="always" :style="{ margin: '10px 0 0 0' }">
    <el-table border>
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        label="属性名称"
        align="center"
        width="200"
      ></el-table-column>
      <el-table-column
        label="属性值名称"
        align="center"
        width="auto"
      ></el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="200"
      ></el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="less" scoped></style>

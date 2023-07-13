<script setup lang="ts">
import { reqSPUList } from '@/api/product/spu/spu'
import useCategoryStore from '@/store/global/category/category'
import CategorySearch from '@/components/category-search/category-search.vue'
import usePage from '@/hooks/usePage'
import { SPU } from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from '@/skuForm.vue'
const categoryStore = useCategoryStore()
const scene = ref(0)
const tabelData = ref<SPU[]>([])
const getHasSpu = async (pager: number = 1) => {
  currentPage.value = pager
  const res = await reqSPUList(
    currentPage.value,
    pageSize.value,
    categoryStore.category3Id,
  )
  addAttrButton.value = false
  tabelData.value = res.data.records
  total.value = res.data.total
}
const { total, handleCurrentChange, handleSizeChange, pageSize, currentPage } =
  usePage(getHasSpu)
const addAttrButton = ref(true)
</script>
<template>
  <div>
    <CategorySearch
      :isDisabled="scene"
      @send-catgory-id="getHasSpu"
      @send-attr-button="addAttrButton = true"
    ></CategorySearch>
    <el-card shadow="always" :style="{ margin: '10px 0 0 0' }">
      <div class="showList">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="addAttrButton"
        >
          添加SPU
        </el-button>
        <el-table
          :data="tabelData"
          border
          style="margin: 10px 0px"
          max-height="500px"
        >
          <el-table-column
            align="center"
            label="序号"
            type="index"
            width="80"
          ></el-table-column>
          <el-table-column
            align="center"
            label="SPU名称"
            prop="spuName"
          ></el-table-column>
          <el-table-column
            align="center"
            label="SPU描述"
            prop="description"
          ></el-table-column>
          <el-table-column align="center" label="SPU操作">
            <template #="{ row }">
              <el-button
                icon="Plus"
                type="primary"
                size="small"
                title="添加SKU"
              ></el-button>
              <el-button
                icon="Edit"
                type="warning"
                size="small"
                title="修改SPU"
              ></el-button>
              <el-button
                icon="View"
                type="info"
                size="small"
                title="查看SKU列表"
              ></el-button>
              <el-button
                icon="Delete"
                type="danger"
                size="small"
                title="删除SPU"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pageination">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            :small="true"
            :disabled="false"
            :background="true"
            layout="total, sizes,->, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <div class="spuForm">
        <SpuForm></SpuForm>
      </div>
      <div class="skuForm">
        <SkuForm></SkuForm>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>

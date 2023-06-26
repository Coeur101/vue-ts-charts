<script setup lang="ts">
import { ATTR_LIST } from '@/api/product/attr/type'
import CategorySearch from '@/components/category-search/category-search.vue'
import { reqAttr } from '@/api/product/attr/attr'
const tabelData = ref<ATTR_LIST[]>([])
// 定义新增按钮是否可用，只有当三级分类有值时才能够使用
const addAttrButton = ref<boolean>(true)
// 定义card组件内容切换的变量
let scene = ref<number>(0) // scene=0时展示属性值的数据，为1时展示添加修改的表格
const getAttrId = async (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string,
) => {
  tabelData.value = []
  const result = await reqAttr(category1Id, category2Id, category3Id)
  tabelData.value = result.data
  addAttrButton.value = false
}
const addAttr = () => {
  scene.value = 1
}
const updateAttr = () => {}
// 取消按钮的回调
const cancel = () => {
  scene.value = 0
}
</script>
<template>
  <el-card shadow="always">
    <CategorySearch @send-catgory-id="getAttrId"></CategorySearch>
  </el-card>

  <el-card shadow="always" :style="{ margin: '10px 0 0 0' }">
    <div v-show="scene == 0">
      <el-button
        icon="Plus"
        style="margin-bottom: 10px"
        type="primary"
        :disabled="addAttrButton"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table border :data="tabelData" :max-height="500">
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
          prop="attrName"
        ></el-table-column>
        <el-table-column label="属性值名称" align="center" width="auto">
          <template #="{ row }">
            <el-tag
              v-for="item in row.attrValueList"
              :key="item.id"
              class="tag"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template #="{ row }">
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="updateAttr"
            ></el-button>
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="WarningFilled"
              icon-color="#e6a23c"
              @confirm=""
              :title="`确定要删除这个${row.attrName}属性吗?`"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene == 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称"></el-input>
        </el-form-item>
      </el-form>
      <el-button icon="Plus" type="primary">添加属性值</el-button>
      <el-button size="default" @click="cancel">取消</el-button>
      <el-table border :max-height="400">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          label="属性值名称"
          align="center"
          width="auto"
        ></el-table-column>
        <el-table-column label="属性值操作" align="center" width="200">
          <template #="{ row }">
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="WarningFilled"
              icon-color="#e6a23c"
              @confirm=""
              :title="`确定要删除这个${row.attrName}属性吗?`"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary">保存</el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.tag {
  margin: 5px;
}
</style>

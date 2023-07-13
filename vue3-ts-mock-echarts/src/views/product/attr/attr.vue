<script setup lang="ts">
import { ATTR_LIST, ATTR_VALUE_LIST } from '@/api/product/attr/type'
import CategorySearch from '@/components/category-search/category-search.vue'
import {
  reqAddAttrOrUpdate,
  reqAttr,
  reqDelAttr,
} from '@/api/product/attr/attr'
import useCategoryStore from '@/store/global/category/category'
import { ElMessage, InputInstance } from 'element-plus'
const categoryStore = useCategoryStore()
const tabelData = ref<ATTR_LIST[]>([])
// 定义el-input的组件实例的数组
const attrInputArr = ref<InputInstance[]>([])
// 定义新增按钮是否可用，只有当三级分类有值时才能够使用
const addAttrButton = ref<boolean>(true)
const attrParams = reactive<ATTR_LIST>({
  attrName: '',
  attrValueList: [],
  categoryId: '', // 分类的id
  categoryLevel: 3, //三级分类
})
// 定义card组件内容切换的变量
let scene = ref<number>(0) // scene=0时展示属性值的数据，为1时展示添加修改的表格
const getAttrId = async () => {
  tabelData.value = []
  const result = await reqAttr(
    categoryStore.category1Id,
    categoryStore.category2Id,
    categoryStore.category3Id,
  )
  tabelData.value = result.data
  addAttrButton.value = false
}
const addAttr = () => {
  // 清空数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '', // 分类的id
    categoryLevel: 3, //三级分类
  })
  attrParams.categoryId = categoryStore.category3Id
  scene.value = 1
}
const addAttrValue = () => {
  if (attrParams.attrValueList?.find((item) => item.valueName === '')) {
    ElMessage.error('属性值不能为空')
    return
  }
  attrParams.attrValueList?.push({
    valueName: '',
    flag: false,
  })
  nextTick(() => {
    attrInputArr.value.pop()?.focus()
  })
}
const updateAttr = (data: ATTR_LIST) => {
  // 使用深拷贝，这样修改的时候就不会改变原对象
  Object.assign(attrParams, JSON.parse(JSON.stringify(data)))
  scene.value = 1
}
const delAttr = async (data: ATTR_LIST) => {
  const res = await reqDelAttr(data.id as number)
  ElMessage.success(res.message)
  getAttrId()
}
const handleShowAttr = (data: ATTR_VALUE_LIST, index: number) => {
  if (data.valueName?.trim() === '') {
    // 删除属性值为空的元素
    attrParams.attrValueList?.splice(index, 1)
    ElMessage.error('属性值不能为空')
    return
  }
  if (
    attrParams.attrValueList?.find((item) => {
      if (item != data) {
        return item.valueName === data.valueName
      }
    })
  ) {
    ElMessage.error('属性值不能重复')
    return
  }

  data.flag = true
}
const handleUpdateAttr = (data: ATTR_VALUE_LIST, index: number) => {
  nextTick(() => {
    attrInputArr.value[index].focus()
  })

  data.flag = false
}
const saveAttr = async () => {
  const res = await reqAddAttrOrUpdate(attrParams)
  if (res) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttrId()
  }
}
// 取消按钮的回调
const cancel = () => {
  scene.value = 0
}
// 组件销毁之前,清空相关的数据
onBeforeUnmount(() => {
  // 清空仓库中的数据
  categoryStore.$reset()
})
</script>
<template>
  <CategorySearch
    :isDisabled="scene"
    @send-catgory-id="getAttrId"
    @send-attr-button="addAttrButton = false"
  ></CategorySearch>

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
              @click="updateAttr(row)"
            ></el-button>
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="WarningFilled"
              icon-color="#e6a23c"
              @confirm="delAttr(row)"
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
      <el-form :inline="true" :model="attrParams">
        <el-form-item label="属性名称">
          <el-input
            placeholder="请输入属性名称"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        icon="Plus"
        type="primary"
        :disabled="attrParams.attrName ? false : true"
        @click="addAttrValue"
      >
        添加属性值
      </el-button>
      <el-button size="default" @click="cancel">取消</el-button>
      <el-table
        border
        style="margin: 10px 0"
        :max-height="400"
        :data="attrParams.attrValueList"
      >
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column label="属性值名称" align="center" width="auto">
          <template #="{ row, $index }">
            <el-input
              placeholder="请你输入属性值名称"
              v-model="row.valueName"
              :ref="(el:any)=>attrInputArr[$index] = el"
              v-show="!row.flag"
              @blur="handleShowAttr(row, $index)"
            ></el-input>
            <div v-show="row.flag" @click="handleUpdateAttr(row, $index)">
              {{ row.valueName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作" align="center" width="200">
          <template #="{ row, $index }">
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              icon="WarningFilled"
              icon-color="#e6a23c"
              :title="`确定要删除这个${row.valueName}属性吗?`"
              @confirm="attrParams.attrValueList?.splice($index, 1)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="saveAttr">保存</el-button>
      <el-button size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.tag {
  margin: 5px;
}
</style>

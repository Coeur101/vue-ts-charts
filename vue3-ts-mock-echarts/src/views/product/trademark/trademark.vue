<script setup lang="ts">
import {
  reqAddOrUpdateTrademark,
  reqHasTrademark,
  reqDelTrademark,
} from '@/api/product/trademark/trademark'
import { TRADEMARK_LIST } from '@/api/product/trademark/type'
import { ElMessage, FormInstance, UploadProps } from 'element-plus'
const pageSize = ref<number>(10)
const currentPage = ref<number>(1)
const trademark_form_ref = ref<FormInstance>()
// 存储已有品牌数量的总数
const total = ref<number>(0)
const dialogFormVisible = ref<boolean>(false)
// 存储品牌的列表数据
let tabelData = ref<TRADEMARK_LIST[] | undefined>([])
let trademarkParams = reactive<TRADEMARK_LIST>({
  logoUrl: '',
  tmName: '',
})
/**
 * 自定义校验规则
 */
const validatorTmName = <T extends string>(
  rule: any,
  value: T,
  callBack: Function,
) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称不得小于2位'))
  }
}
/**
 * 品牌logo的校验规则
 * @param rule 表单校验规则
 * @param value 表单输入的内容
 * @param callBack 回调方法。错误还是正确都得调用
 */
const validatorLogoUrl = <T extends string>(
  rule: any,
  value: T,
  callBack: Function,
) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('logo图片必须上传'))
  }
}
/**
 * 表单校验规则
 */
const rules = reactive({
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
  tmName: [{ required: true, trigger: 'blur', validator: validatorTmName }],
})

/**
 * 当前页条数发生改变时
 */
const handleSizeChange = () => {
  currentPage.value = 1
  getHasTrademark(currentPage.value)
}
/**
 * 当前页码发生改变时
 */
const handleCurrentChange = () => {
  getHasTrademark(currentPage.value)
}
/**
 * 通过当前页码和页中条数发生改变时，请求后端获取数据
 * @param pager 当前页码
 */
const getHasTrademark = async (pager: number = 1) => {
  currentPage.value = pager
  const result = await reqHasTrademark(currentPage.value, pageSize.value)
  if (result) {
    total.value = result.data!.total
    // 浅拷贝一层
    tabelData.value = result.data?.records
  }
}
/**
 * 新增品牌
 */
const addTrademark = () => {
  trademark_form_ref.value?.clearValidate()
  trademarkParams.logoUrl = ''
  trademarkParams.tmName = ''
  trademarkParams.id = undefined
  dialogFormVisible.value = true
}
/**
 * 修改品牌
 * @param data 需要修改的品牌数据对象
 */
const updateTrademark = (data: TRADEMARK_LIST) => {
  trademark_form_ref.value?.clearValidate()
  dialogFormVisible.value = true
  Object.assign(trademarkParams, data)
}
const deleteTrademarkConfirm = async (data: TRADEMARK_LIST) => {
  const result = await reqDelTrademark(data.id as number)
  if (result) {
    ElMessage.success('删除成功')
    getHasTrademark(
      tabelData.value!.length > 1 ? currentPage.value : currentPage.value - 1,
    )
  }
}
// 上传图片
const handleTrademarkLogoSuccess: UploadProps['onSuccess'] = (response) => {
  if (response) {
    trademarkParams.logoUrl = response.data
    // 图片上传成功，清理对应的校验提示信息
    trademark_form_ref.value?.clearValidate('logoUrl')
  }
}
/**
 * 图片上传前的钩子
 * @param rawFile 当前上传的图片文件
 */
const beforeTrademarkLogoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('必须要image')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('不得大于2mb')
    return false
  }
  return true
}
// 发起请求，添加或修改
const confirm = async () => {
  // 发送请求之前对表单进行校验 返回的是一个promise对象，通过await等待成功结果，才能继续执行接下来的代码
  await trademark_form_ref.value?.validate()
  const result = await reqAddOrUpdateTrademark(trademarkParams)
  dialogFormVisible.value = false
  if (result) {
    ElMessage.success(trademarkParams.id ? '修改品牌成功' : '添加品牌成功')
    getHasTrademark(
      trademarkParams.id
        ? currentPage.value
        : Math.ceil(total.value / pageSize.value),
    )
  }
}

const indexMethod = (index: number) => {
  return index + 1 + (currentPage.value - 1) * pageSize.value
}
onMounted(() => {
  getHasTrademark()
})
</script>
<template>
  <el-card class="box-card">
    <!-- 添加品牌 -->
    <el-button type="primary" icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <!-- 数据 -->
    <el-table border class="tabel" max-height="500" :data="tabelData">
      <el-table-column
        prop="col.id"
        type="index"
        :index="indexMethod"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="350"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="logoUrl"
        label="品牌logo"
        width="350"
        align="center"
      >
        <template #default="{ row }">
          <img :src="row.logoUrl" class="trademark_logo" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="auto" align="center">
        <template #="{ row }">
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="updateTrademark(row)"
          ></el-button>
          <el-popconfirm
            width="220"
            confirm-button-text="确定"
            cancel-button-text="取消"
            icon="WarningFilled"
            icon-color="#e6a23c"
            @confirm="deleteTrademarkConfirm(row)"
            :title="`确定要删除这个${row.tmName}品牌吗？`"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
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
  </el-card>
  <el-dialog
    v-model="dialogFormVisible"
    title="新增品牌"
    :close-on-click-modal="false"
  >
    <el-form
      label-width="100px"
      class="trademark_form"
      :model="trademarkParams"
      ref="trademark_form_ref"
      :rules="rules"
    >
      <el-form-item label="品牌名称:" prop="tmName">
        <el-input
          v-model="trademarkParams.tmName"
          type="text"
          placeholder="请输入品牌的名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO:" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleTrademarkLogoSuccess"
          :before-upload="beforeTrademarkLogoUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon" size="50">
            <UploadFilled />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.tabel {
  margin: 10px 0;
  .trademark_logo {
    width: 100px;
    height: 100px;
    object-fit: contain;
  }
}
.trademark_form {
  width: 80%;
  :deep(.avatar-uploader) {
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      &:hover {
        border-color: var(--el-color-primary);
      }
    }
    .avatar {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  :deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>

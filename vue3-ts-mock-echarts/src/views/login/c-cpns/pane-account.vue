<script setup lang="ts">
import { LOGIN_INFO } from '@/api/user/type'
import useUserStore from '@/store/login/Login'
import { FormInstance, type FormRules } from 'element-plus'
const userStore = useUserStore()
const accountFormRef = ref<FormInstance>()
const account = reactive<LOGIN_INFO>({
  username: 'admin',
  password: 'atguigu123',
})
const accountRules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur',
    },
    {
      pattern: /^[a-zA-Z0-9]{5,20}$/,
      message: '必须5~20位或字母组成',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    {
      pattern: /^[a-zA-z0-9]{3,}$/,
      message: '必须是3位以上字母或数字组成',
      trigger: 'blur',
    },
  ],
})
const userLogin = () => {
  accountFormRef.value?.validate((valid) => {
    if (!valid) {
      return
    }
    userStore.postUserLogin(account)
  })
}
defineExpose({
  userLogin,
})
</script>
<template>
  <div class="form-account">
    <el-form
      :model="account"
      label-position="right"
      label-width="60px"
      style="max-width: 460px"
      :rules="accountRules"
      status-icon
      ref="accountFormRef"
    >
      <el-form-item label="帐号" prop="username">
        <el-input clearable v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          clearable
          show-password
          v-model="account.password"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>

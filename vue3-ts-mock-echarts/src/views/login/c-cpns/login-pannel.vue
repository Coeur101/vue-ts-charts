<script setup lang="ts">
import PanelAccount from './pane-account.vue'
import PanelPhone from './pane-phone.vue'
const currentTab = ref<string>('account')
const isRemPwd = ref<boolean>(false)
// 获取account子组件的实例对象
// 使用instanceType输入一个泛型，typeof 获取子组件的实例对象的类型来给定一个子组件实例对象的类型
const accountRef = ref<InstanceType<typeof PanelAccount>>()
const handelLoginAction = () => {
  accountRef.value?.userLogin()
}
</script>
<template>
  <div class="login-pannel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <!-- 1、账号登录 -->
      <el-tab-pane name="account">
        <template #label>
          <span class="label">
            <span class="text">账号登录</span>
          </span>
        </template>
        <PanelAccount ref="accountRef" />
      </el-tab-pane>
      <!-- 2、手机登录 -->
      <el-tab-pane name="phone">
        <template #label>
          <span class="label">
            <span class="text">手机登录</span>
          </span>
        </template>
        <PanelPhone />
      </el-tab-pane>
    </el-tabs>
    <div class="contorl">
      <span>
        <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      </span>
      <span><el-link type="primary">忘记密码</el-link></span>
    </div>
    <div>
      <ElButton
        type="primary"
        @click="handelLoginAction"
        class="login-btn"
        size="large"
      >
        立即登录
      </ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-pannel {
  width: 330px;
  margin-bottom: 150px;
  margin-top: 200px;
  .title {
    text-align: center;
    margin-bottom: 15px;
    font-size: 2rem;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }

  .contorl {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>

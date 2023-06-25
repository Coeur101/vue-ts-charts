<script setup lang="ts">
import useUserStore from '@/store/login/Login'
import useLayOutSettingStore from '@/store/setting/setting'
const router = useRouter()
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const settingStore = useLayOutSettingStore()
const { userInfo } = storeToRefs(userStore)
const handleRefsh = () => {
  settingStore.refsh = !settingStore.refsh
}
// 全屏模式
const handleScreen = () => {
  // 查询是否全屏 全屏为true，不是为false
  let full = document.fullscreenElement
  if (!full) {
    // 调用全屏的API
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏
    document.exitFullscreen()
  }
}
const handleUserOut = async () => {
  try {
    await userStore.userLoginOut()
  } catch (error) {}

  // 回到登录页面
  router.replace('/login')
}
</script>
<template>
  <el-button icon="Refresh" circle @click="handleRefsh" />

  <el-button icon="FullScreen" circle @click="handleScreen" />

  <el-button icon="Setting" circle />
  <el-avatar :src="userInfo?.avatar" />
  <el-dropdown trigger="click">
    <span class="el-dropdown-link">
      {{ userInfo?.name }}
      <el-icon class="el-icon--right"><arrow-down /></el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleUserOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.el-button {
  &:focus {
    background-color: white;
    border-color: #dcdfe6;
    color: #67696d;
  }
  &:hover {
    color: var(--el-button-hover-text-color);
    border-color: var(--el-button-hover-border-color);
    background-color: var(--el-button-hover-bg-color);
    outline: 0;
  }
}
</style>

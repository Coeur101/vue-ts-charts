<script setup lang="ts">
import useLayOutSettingStore from '@/store/setting/setting'
const settingStore = useLayOutSettingStore()

// 控制组件销毁和重建
const flag = ref<boolean>(true)
watch(
  () => settingStore.refsh,
  () => {
    // 点击刷新按钮后销毁router-view的路由组件
    flag.value = false
    // 等待页面的DOM元素加载完毕之后，再把flag转为true，用于控制下一次的刷新
    nextTick(() => {
      flag.value = true
    })
  },
)
</script>
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" v-if="flag"></component>
  </router-view>
</template>

<style lang="scss" scoped></style>

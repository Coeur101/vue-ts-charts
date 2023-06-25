<script setup lang="ts">
import useLayOutSettingStore from '@/store/setting/setting'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
const route = useRoute()
const layOutSettingStore = useLayOutSettingStore()
const { fold } = storeToRefs(layOutSettingStore)

const menuCopll = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold
}
</script>
<template>
  <el-icon size="25" style="cursor: pointer" @click="menuCopll">
    <component :is="fold ? 'Expand' : 'fold'"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 动态的展示路由的名字和标题 -->
    <!-- 通过匹配到的路由，route.matched来动态的生成 -->

    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :key="index"
      :to="item.path"
      v-show="item.meta.title"
    >
      <div class="breadcrumb_text">
        <el-icon size="15">
          <component :is="item.meta.icon"></component>
        </el-icon>
        {{ item.meta.title }}
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb_text {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>

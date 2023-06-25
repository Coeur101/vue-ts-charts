<script setup lang="ts">
import { useRoute } from 'vue-router'
import logo from './logo/logo.vue'
import Menu from './menu/menu.vue'
import useUserStore from '@/store/login/Login'
import { storeToRefs } from 'pinia'
import Main from './main/main.vue'
import TopBar from './topbar/topbar.vue'
import useLayOutSettingStore from '@/store/setting/setting'

const route = useRoute()
const userStore = useUserStore()
const { menuRoutes } = storeToRefs(userStore)
// 菜单是否折叠
const { fold } = storeToRefs(useLayOutSettingStore())
</script>
<template>
  <div class="layout_container">
    <!-- 顶部导航 -->
    <div class="layout_topbar" :class="{ fold: fold }"><TopBar /></div>
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: fold }">
      <logo></logo>
      <el-scrollbar class="scrollBar">
        <el-menu
          background-color="#001529"
          text-color="white"
          router
          :default-active="route.path"
          unique-opened
          :collapse="fold"
        >
          <Menu :menu-list="menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout_main" :class="{ fold: fold }"><Main></Main></div>
  </div>
</template>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  position: relative;
  .layout_slider {
    // 使用全局定义的宽度
    width: $base-menu-width;
    background-color: $base-menu-backColor;
    height: 100vh;
    overflow: auto;
    transition: all 0.3s;
    white-space: nowrap;
    .scrollBar {
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border: none;
      }
    }
    &.fold {
      width: $base-menu-fold-width;
      overflow: hidden;
    }
  }

  .layout_topbar {
    width: calc(100% - $base-menu-width);
    height: $base-topbar-height;
    background-color: white;
    box-shadow: 0px 3px 3px rgba($color: #000000, $alpha: 0.3);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    transition: all 0.3s;
    &.fold {
      width: calc(100% - $base-menu-fold-width);
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-topbar-height);
    left: $base-menu-width;
    top: $base-topbar-height;
    overflow: auto;
    transition: all 0.3s;
    padding: 10px;
    &.fold {
      width: calc(100% - $base-menu-fold-width);
      left: $base-menu-fold-width;
    }
  }
}
</style>

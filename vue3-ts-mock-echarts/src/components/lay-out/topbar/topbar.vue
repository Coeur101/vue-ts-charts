<script setup lang="ts">
import Avatar from './avatar/avatar.vue'
import Breadcrumb from './breadcrumb/breadcrumb.vue'
</script>
<template>
  <div class="topbar">
    <div class="topbar_left">
      <breadcrumb></breadcrumb>
    </div>
    <div class="topbar_right">
      <Avatar></Avatar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.topbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .topbar_left {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 20px;
  }
  .topbar_right {
    display: flex;
    align-items: center;
    height: 100%;
    gap: 10px;
  }
}
</style>

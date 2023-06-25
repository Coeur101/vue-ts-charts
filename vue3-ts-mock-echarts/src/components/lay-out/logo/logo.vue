<script setup lang="ts">
import setting from '@/setting'
</script>
<template>
  <div class="logo" v-if="setting.logoHiden">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  color: white;
  font-weight: 600;
  align-items: center;
  padding: 15px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-menu-logo-ftSize;
    margin-left: 10px;
  }
}
</style>

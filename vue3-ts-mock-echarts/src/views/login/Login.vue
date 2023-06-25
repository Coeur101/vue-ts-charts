<script setup lang="ts">
import loginPannel from './c-cpns/login-pannel.vue'
</script>
<template>
  <div class="login-container">
    <loginPannel />
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(@/assets/img/login-bg.svg);
}
</style>

<script setup lang="ts">
export interface PROP {
  // 前缀
  preFix?: string
  // 图标的名称
  name: string
  // 图标宽度
  width?: string
  // 图标高度
  height?: string
  // 图标颜色
  color?: string
}

withDefaults(defineProps<PROP>(), {
  // 图标前缀默认值
  preFix: '#icon-',
  width: '16px',
  height: '16px',
})
</script>
<template>
  <svg :style="{ width: width, height: height }">
    <use :xlink:href="preFix + name" :fill="color"></use>
  </svg>
</template>

<style lang="less" scoped></style>

<script setup lang="ts"></script>
<template>
  <div class="form-phone">
    <el-form label-position="right" label-width="0" style="max-width: 460px">
      <el-form-item>
        <el-input clearable placeholder="请输入手机号" />
      </el-form-item>

      <el-form-item>
        <el-row :gutter="17">
          <el-col :span="15">
            <el-input type="text" placeholder="输入验证码" />
          </el-col>
          <el-col :span="6">
            <ElButton type="primary">获取验证码</ElButton>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less" scoped></style>

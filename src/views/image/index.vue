<template>
  <div class="imgages-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        > -->
      </div>
      <imagesList></imagesList>
    </el-card>
  </div>
</template>

<script>
import imagesList from "./components/images-list";
export default {
  name: "ImagesIndex",
  data() {
    return {};
  },
  components: {
    imagesList,
  },
};
</script>

<style lang="less" scoped>
</style>

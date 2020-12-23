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
      <div class="top-head" style="padding-bottom: 20px">
        <el-radio-group
          v-model="collect"
          size="mini"
          @change="loadGetImages(1)"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          type="success"
          size="mini"
          @click="dialogUploadVisible = true"
          >上传素材</el-button
        >
      </div>
      <el-row :gutter="20">
        <el-col
          class="images-item"
          v-for="(img, index) in images"
          :key="index"
          :xs="12"
          :sm="6"
          :md="4"
          :lg="3"
          :xl="4"
          ><el-image
            style="height: 100px"
            :src="img.url"
            fit="cover"
          ></el-image>
          <div class="images-action">
            <i
              :class="{
                'el-icon-star-on': img.is_collected,
                'el-icon-star-off': !img.is_collected,
              }"
              @click="colledImg(img)"
            ></i>
            <i class="el-icon-delete-solid"></i></div
        ></el-col>
      </el-row>
      <el-pagination
        class="elPage"
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page.sync="page"
        @current-change="currChange"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        multiple
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name="image"
        :headers="headers"
        :on-success="onUploadSuccess"
        :on-error="onUploadError"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage } from "@/api/images";
export default {
  name: "ImagesIndex",
  data() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return {
      collect: "false",
      images: [],
      dialogUploadVisible: false,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      page: 1,
      totalCount: 0,
      pageSize: 10,
    };
  },
  created() {
    this.loadGetImages(1);
  },
  methods: {
    loadGetImages(page) {
      this.page = page;
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize,
      }).then((res) => {
        // console.log(res);
        this.images = res.data.data.results;
        this.totalCount = res.data.data.total_count;
      });
    },
    changeCollect() {
      this.loadGetImages(1);
    },
    onUploadSuccess() {
      // 关闭对话
      this.dialogUploadVisible = false;
      // 更新列表
      this.loadGetImages(this.page);
      this.$message({
        type: "success",
        message: "上传成功",
      });
    },
    onUploadError(err, file) {
      console.log(this.headers, "headers");
      console.log(err, "ssss");
      console.log(file, "2222");
    },
    currChange(page) {
      this.loadGetImages(page);
    },
    colledImg(img) {
      console.log(img);
      collectImage(img.id, !img.is_collected).then((res) => {
        console.log(res);
        img.is_collected = !img.is_collected;
        this.$message({
          type: "success",
          message: img.is_collected ? "收藏成功" : "取消成功",
        });
      });
    },
  },
};
</script>

<style scoped lang="less" >
.top-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.elPage {
  margin-top: 20px;
}
.images-item {
  position: relative;
}
.images-action {
  position: absolute;
  left: 10px;
  right: 10px;
  top: 60px;
  align-items: center;
  bottom: 0;
  height: 40px;
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  color: #fff;
  background-color: rgba(204, 204, 204, 0.5);
}
</style>


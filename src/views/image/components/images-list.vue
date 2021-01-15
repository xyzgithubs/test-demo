<template>
  <div class="imgages-container">
    <div class="top-head" style="padding-bottom: 20px">
      <el-radio-group v-model="collect" size="mini" @change="loadGetImages(1)">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button
        type="success"
        size="mini"
        v-if="isShowAdd"
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
      >
        <el-image
          @click.native="selected = index"
          style="height: 100px"
          :src="img.url"
          fit="cover"
        ></el-image>
        <div class="select" v-if="isShowSelected && selected === index"></div>
        <div class="images-action" v-if="isShowAction">
          <!-- <i
              :class="{
                'el-icon-star-on': img.is_collected,
                'el-icon-star-off': !img.is_collected,
              }"
              @click="colledImg(img)"
            ></i> -->
          <el-button
            type="warning"
            :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            circle
            size="small"
            :loading="img.loading"
            @click="colledImg(img)"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            circle
            @click="colleDelete(img)"
          ></el-button></div
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
import { getImages, collectImage, deleteImg } from "@/api/images";
export default {
  name: "ImagesList",
  props: {
    isShowAdd: {
      type: Boolean,
      default: true,
    },
    isShowAction: {
      type: Boolean,
      default: true,
    },
    isShowSelected: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return {
      selected: null,
      collect: "false",
      images: [],
      dialogUploadVisible: false,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      page: 1,
      totalCount: 0,
      pageSize: 10,
      // isLoding
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
        // console.log(res, 135);
        const result = res.data.data.results;
        result.forEach((img) => {
          img.loading = false;
        });
        this.images = result;
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
      img.loading = true;
      collectImage(img.id, !img.is_collected).then((res) => {
        console.log(res);
        img.is_collected = !img.is_collected;
        img.loading = false;
        this.$message({
          type: "success",
          message: img.is_collected ? "收藏成功" : "取消成功",
        });
      });
    },
    colleDelete(img) {
      img.loading = true;
      deleteImg(img.id).then((res) => {
        console.log(res);
        img.loading = false;
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.loadGetImages(this.page);
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
.select {
  background: url("./selecd.jpg") no-repeat;
  width: 50px;
  height: 50px;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>


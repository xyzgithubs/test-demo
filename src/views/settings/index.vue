<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="18"
          ><el-form ref="user" :model="user" label-width="80px">
            <el-form-item label="编号">{{ user.id }}</el-form-item>
            <el-form-item label="手机">{{ user.mobile }}</el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onUpdataUser"
                :loading="updataUserLoading"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="2" :span="4">
          <label for="file">
            <el-avatar shape="square" :size="150" fit="cover" :src="user.photo">
            </el-avatar>
            <p>修改头像</p>
          </label>
          <!-- <p @click="$refs.file.click()">点击修改头像</p> -->
          <!-- <label for="file">点击修改头像</label> -->
          <input
            ref="file"
            id="file"
            type="file"
            hidden
            @change="onFileChange"
          />
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      width="30%"
      @opened="openPreview"
    >
      <div class="preview-img-box">
        <img :src="previewImage" alt="" width="100%" ref="preview-img" />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePhoto" :loading="updataLoding"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script >
import { getUserProfile, updataUserPhoto, updatUserInfo } from "@/api/user.js";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import globalBus from "@/utils/global-bus";
export default {
  name: "SettingIndex",
  data() {
    return {
      user: {
        emali: "",
        id: null,
        intro: "",
        mobile: "",
        name: "",
        photo: "",
      },
      dialogVisible: false,
      previewImage: "",
      cropper: null, //被裁剪实例
      updataLoding: false,
      updataUserLoading: false,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then((res) => {
        // console.log(res);
        this.user = res.data.data;
        // console.log(this.user);
      });
    },
    onFileChange() {
      // console.log("2222");
      const file = this.$refs.file;
      // console.log(file);
      const blobData = window.URL.createObjectURL(file.files[0]);
      // console.log(blobData);
      this.previewImage = blobData;
      this.dialogVisible = true;
      // console.log(this.$refs.file);
      // 解决选择同名文件不触发
      this.$refs.file.value = "";
    },
    openPreview() {
      // const image = document.getElementById("image");
      if (this.cropper) {
        this.cropper.replace(this.previewImage);
        return;
      }
      const image = this.$refs["preview-img"];
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: "none",
        aspectRatio: 1,
        cropBoxResizable: false,
      });
    },
    updatePhoto() {
      this.updataLoding = true;
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const fd = new FormData();
        fd.append("photo", file);
        updataUserPhoto(fd).then((res) => {
          console.log(res);
          this.dialogVisible = false;
          // this.user.photo = res.data.data.photo;
          this.updataLoding = false;
          this.$message({ type: "success", message: "更新成功" });
          this.user.photo = window.URL.createObjectURL(file);
        });
      });
    },
    // closedPreview() {
    //   this.cropper.destroy();
    // },
    onUpdataUser() {
      // console.log("submit!");
      this.updataUserLoading = true;
      const { user, intro, emali } = this.user;
      updatUserInfo({
        user,
        intro,
        emali,
      }).then((res) => {
        // console.log(res);
        this.$message({
          type: "success",
          message: "更新成功",
        });
        this.updataUserLoading = false;
      });

      globalBus.$emit("updataUser", this.user);
    },
  },
};
</script>

<style lang="less">
.preview-img-box {
  display: block;
  max-width: 100%;
  height: 200px;
}
</style>

<template>
  <div class="upload-cover" @click="showDialog">
    <div class="cover-warp">
      <img ref="cover-img" />
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" append-to-body>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first"
          ><imagesList
            ref="image-list"
            :is-show-add="false"
            :isShowAction="false"
            :isShowSelected="true"
          ></imagesList>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" ref="file" @change="onFileCange" />
          <img ref="preview-img" width="100" />
          <!-- <input type="button" value="333" /> -->
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script >
import imagesList from "../../image/components/images-list";
import { updataImages } from "@/api/images";
export default {
  name: "UploadCover",
  // props: ["cover-img"],
  props: ["value"],
  components: {
    imagesList,
  },
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
    };
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    onFileCange() {
      // 获取文件对象
      const file = this.$refs.file.files[0];
      // console.log(file, "file");
      const blob = window.URL.createObjectURL(file);
      // console.log(blob, "blob");
      this.$refs["preview-img"].src = blob;
    },
    onCoverfirm() {
      const file = this.$refs.file.files[0];
      if (this.activeName == "second" && !file) {
        this.$message("请选择文件");
        return;
      } else if (this.activeName == "first") {
        // 进入素材库
        const imgListArr = this.$refs["image-list"];
        // console.log(imgListArr.selected, 65);
        const imgselected = imgListArr.selected;
        if (imgselected == null) {
          this.$message("请选择图片");
          return;
        }
        this.dialogVisible = false;
        console.log(imgListArr.images[imgselected].url);
        // debugger;
        this.$emit("input", imgListArr.images[imgselected].url);
      }
      const fd = new FormData();
      fd.append("image", file);
      updataImages(fd).then((res) => {
        console.log(res);
        // 关闭弹框

        this.$refs["cover-img"].src = res.data.data.url;

        this.$emit("input", res.data.data.url);
      });
    },
  },
};
</script>

<style lang="less" scope>
.cover-warp {
  width: 150px;
  // height: 120px;
  border: 1px solid #666;
  img {
    max-width: 100%;
  }
}
</style>

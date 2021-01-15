<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            $route.query.id ? "修改文章" : "发布文章"
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form
        :rules="publishRules"
        ref="publishRef"
        :model="article"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <el-tiptap
            lang="zh"
            v-model="article.content"
            :extensions="extensions"
            height="350"
            placeholder="请输入文章内容"
          />
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="article.cover.type > 0">
            <!-- <uploadcover
              @uploadCover="upCover(index, $event)"
              :cover-img="article.cover.images[index]"
              v-for="(cover, index) in article.cover.type"
              :key="cover"
            ></uploadcover> -->
            <uploadcover
              v-model="article.cover.images[index]"
              v-for="(cover, index) in article.cover.type"
              :key="cover"
            ></uploadcover>
          </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              v-for="(channelItem, index) in channels"
              :key="index"
              :label="channelItem.name"
              :value="channelItem.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">{{
            $route.query.id ? "修改" : "发布"
          }}</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script >
import uploadCover from "./components/uploadcover";
import {
  getArticleChannels,
  addArticle,
  getArticleID,
  updataArticle,
} from "@/api/article";
import { updataImages } from "@/api/images";
import {
  // 需要的 extensions
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Image,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  HorizontalRule,
  Fullscreen,
} from "element-tiptap";
import "element-tiptap/lib/index.css";
import Uploadcover from "./components/uploadcover";
export default {
  name: "publish",
  components: {
    "el-tiptap": ElementTiptap,
    Uploadcover,
  },
  data() {
    return {
      channels: [],
      article: {
        title: "",
        content: "",
        cover: {
          type: 1,
          images: [],
        },
        channel_id: null,
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          uploadRequest(file) {
            console.log("触发了");
            // console.log(file);
            const fd = new FormData();
            fd.append("image", file);
            return updataImages(fd).then((res) => {
              // console.log(res);
              return res.data.data.url;
            });
          },
        }),
        //   {
        //   // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
        //   uploadRequest(file) {
        //     // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
        //     const fd = new FormData();
        //     fd.append("image", file);
        //     // 第1个 return 是返回 Promise 对象
        //     // 为什么？因为 axios 本身就是返回 Promise 对象
        //     return uploadImage(fd).then((res) => {
        //       // 这个 return 是返回最后的结果
        //       return res.data.data.url;
        //     });
        //   }, // 图片的上传方法，返回一个 Promise<url>
        // }

        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new HorizontalRule(), // 分割线
        new Fullscreen(), // 全屏
      ],
      publishRules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 5,
            max: 30,
            message: "长度在 5 到 30 个字符",
            trigger: "blur",
          },
        ],
        content: [
          {
            validator(rule, value, callback) {
              console.log("validator");
              if (value === "<p></p>") {
                // 验证失败
                callback(new Error("请输入内容"));
              } else {
                // 验证成功
                callback();
              }
            },
          },
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        channel_id: [
          { required: true, message: "请选择文章频道", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.ongetChannels();
    // 共用同个组件,
    //判断有无id
    if (this.$route.query.id) {
      // 有id,编辑
      this.loadArticle();
    }
  },
  methods: {
    ongetChannels() {
      getArticleChannels().then((res) => {
        // console.log(res);
        this.channels = res.data.data.channels;
      });
    },
    onPublish(draft = false) {
      // 先要判断校验是否通过
      this.$refs["publishRef"].validate((valid) => {
        console.log(valid, "valid");
        if (!valid) {
          return;
        }
        // 判断有无id,来确定是新增还是修改
        const articleID = this.$route.query.id;
        if (articleID) {
          // 修改
          console.log("进入编辑");
          updataArticle(articleID, this.article, draft).then((res) => {
            console.log(res);
            this.$message({
              message: `${draft ? "存入草稿" : "发布"}完成`,
              type: "success",
            });
            this.$router.push("/article");
          });
        } else {
          // 新增
          addArticle(this.article, draft).then((res) => {
            // console.log(res);
            this.$message({
              message: `${draft ? "存入草稿" : "发布"}完成`,
              type: "success",
            });
            this.$router.push("/article");
          });
        }
      });
    },
    // 修改文章
    loadArticle() {
      getArticleID(this.$route.query.id).then((res) => {
        console.log(res, "修改");
        this.article = res.data.data;
      });
    },
    upCover(index, url) {
      console.log(index, url);
    },
  },
};
</script>

<style lang="less" >
</style>

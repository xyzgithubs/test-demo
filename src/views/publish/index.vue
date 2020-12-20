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
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
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
import {
  getArticleChannels,
  addArticle,
  getArticleID,
  updataArticle,
} from "@/api/article";
export default {
  data() {
    return {
      channels: [],
      article: {
        title: "",
        content: "",
        cover: {
          type: 0,
          images: [],
        },
        channel_id: null,
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
      // 判断有无id,来确定是新增还是修改
      const articleID = this.$route.query.id;
      if (articleID) {
        // 修改
        updataArticle(articleID, this.article, draft).then((res) => {
          // console.log(res);
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
    },
    // 修改文章
    loadArticle() {
      getArticleID(this.$route.query.id).then((res) => {
        // console.log(res);
        this.article = res.data.data;
      });
    },
  },
};
</script>

<style>
</style>

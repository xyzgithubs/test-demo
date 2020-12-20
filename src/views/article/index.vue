<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              v-for="(channeItem, index) in channels"
              :key="index"
              :label="channeItem.name"
              :value="channeItem.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :disabled="loading"
            @click="getArticleData(1)"
            >筛选</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共筛选出{{ totalCount }}条数据</span>
      </div>
      <el-table
        :data="articles"
        stripe
        border
        v-loading="loading"
        style="width: 100%"
        class="list-table"
        align="center"
      >
        <el-table-column label="封面" align="center">
          <template slot-scope="scope">
            <img
              v-if="scope.row.cover.images[0]"
              class="article-cover"
              :src="scope.row.cover.images[0]"
              alt=""
            />
            <img v-else class="article-cover" src="./zwsj.jpg" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="articlStatus[scope.row.status].type">{{
              articlStatus[scope.row.status].text
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          //调到publish页码携带id
          <template slot-scope="scope">
            <el-button
              size="small"
              circle
              type="primary"
              icon="el-icon-edit"
              @click="$router.push('/publish?id=' + scope.row.id)"
            ></el-button>
            <el-button
              size="small"
              circle
              type="danger"
              icon="el-icon-delete"
              @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="page"
        @current-change="currentChange"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticle, getArticleChannels, deleteArticle } from "@/api/article";
export default {
  name: "articleIndex",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      articles: [],
      articlStatus: [
        { type: "", status: "", text: "草稿" },
        { type: "warning", status: "1", text: "待审核" },
        { type: "success", status: "2", text: "审核通过" },
        { type: "info", status: "3", text: "审核失败" },
        { type: "danger", status: "4", text: "已删除" },
      ],
      totalCount: 0, //默认总条数
      pageSize: 10,
      status: null, //默认单选框的选中的值
      channels: [], //频道数组
      channelId: null, //传给后台的值单选框
      rangeDate: null,
      loading: true,
      page: 1, //默认页码
    };
  },
  components: {},
  created() {
    this.getArticleData(1);
    this.loadChannelsData();
  },
  methods: {
    getArticleData(page = 1) {
      this.loading = true;
      getArticle({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        // 开始时间
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        // 结束时间
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null,
      }).then((res) => {
        // console.log(res);
        // total_count 会报错  total_cout : totalCound  转换
        // const { result, total_count } = res.data.data;
        const { total_count: totalCound } = res.data.data;
        this.totalCount = totalCound;
        this.articles = res.data.data.results;
        this.loading = false;
      });
    },
    currentChange(page) {
      this.getArticleData(page);
    },
    loadChannelsData() {
      getArticleChannels().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    onDeleteArticle(articleId) {
      this.$confirm("是否删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          deleteArticle(articleId.toString()).then((res) => {
            // 成功,更新数据
            this.getArticleData(this.page);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang='less'>
.filter-card {
  margin-bottom: 30px;
}
.list-table {
  margin-bottom: 20px;
}
.article-cover {
  width: 100px;
  background-size: cover;
}
</style>

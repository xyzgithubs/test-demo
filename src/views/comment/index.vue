<template>
  <div class="comment-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table class="table-list" :data="articles" border style="width: 100%">
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column label="评论状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? "正常" : "关闭" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope"
            ><el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.statusDisable"
              @change="onChange(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticle, updataCommentStatus } from "@/api/article";
export default {
  name: "CommentIndex",
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      articles: [],
      totalCount: 0,
      pageSize: 10,
      page: 1,
    };
  },
  created() {
    this.loadgetArticel();
  },
  methods: {
    handleSizeChange(val) {
      this.loadgetArticel(1);
    },
    handleCurrentChange(page) {
      console.log(page);
      this.loadgetArticel(page);
    },
    loadgetArticel(page = 1) {
      getArticle({
        response_type: "comment",
        page,
        per_page: this.pageSize,
      }).then((res) => {
        // console.log(res);
        // 先处理数据再赋值
        const results = res.data.data.results;
        results.forEach((articles) => {
          articles.statusDisable = false;
        });
        this.articles = results;
        this.totalCount = res.data.data.total_count;
      });
    },
    onChange(row) {
      console.log(row);
      row.statusDisable = true;
      updataCommentStatus(row.id.toString(), row.comment_status).then((res) => {
        row.statusDisable = false;
        console.log(res);

        this.$message({
          type: "success",
          message: row.comment_status ? "开启文章评论成功" : "关闭文章评论成功",
        });
      });
    },
  },
};
</script>


<style lang="less" scoped>
.table-list {
  margin-bottom: 30px;
}
</style>

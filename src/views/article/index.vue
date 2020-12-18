<template>
   <div class="article-container">
     <el-card class="box-card">
  <div slot="header" class="clearfix">
   <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="状态">
    <el-radio-group v-model="form.resource">
      <el-radio label="全部"></el-radio>
      <el-radio label="草稿"></el-radio>
      <el-radio label="待审核"></el-radio>
      <el-radio label="审核通过"></el-radio>
      <el-radio label="审核失败"></el-radio>
      <el-radio label="已删除"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道">
    <el-select v-model="form.region" placeholder="请选择频道">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动时间">
    <el-date-picker
      v-model="form.date1"
      type="monthrange"
      range-separator="至"
      start-placeholder="开始月份"
      end-placeholder="结束月份">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">筛选</el-button>
  </el-form-item>
</el-form>
</el-card>
   </div>
</template>

<script>
export default {
  name: 'articleIndex',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  components: {},
  methods: {
    onSubmit () {
      console.log('submit!');
    }
  }
}
</script>

<style lang='less'>
</style>

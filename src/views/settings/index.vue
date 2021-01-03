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
              <el-button type="primary" @click="onSubmit">保存</el-button>
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
          <input ref="file" type="file" hidden />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script >
import { getUserProfile } from "@/api/user.js";
export default {
  name: "SettingIndex",
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then((res) => {
        console.log(res);
        this.user = res.data.data;
        console.log(this.user);
      });
    },
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style>
</style>

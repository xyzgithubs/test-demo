<template>
  <el-container class="layout-container">
    <el-aside class="aside"
              width="auto">
      <app-aside class="aside-menu"
                 :isCollapse="isCollapse"></app-aside>
    </el-aside>
    <el-container>
      <el-header class="header">
        <div>
          <i :class="{'el-icon-s-fold':isCollapse,'el-icon-s-unfold':!isCollapse}"
             @click="isCollapse=!isCollapse"></i>
          <span>这是一段文字</span>
        </div>

        <el-dropdown>
          <div class="avarar-wrap">
            <img class="avarar"
                 :src="user.photo"
                 alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <!-- <span>
            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">个人设置</el-dropdown-item>
            <!-- .native修饰符  原生事件 -->
            <el-dropdown-item icon="el-icon-circle-plus"
                              @click.native="onLogOut">用户退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  components: {
    AppAside
  },
  data () {
    return {
      user: {},
      //   默认展开
      isCollapse: false
    }
  },

  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogOut () {
      this.$confirm('是否退出', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 清除登录状态
          window.localStorage.removeItem('user')
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
          //   跳到登录
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  }
}
</script>
<style lang='less' scoped>
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.aside {
  background-color: yellowgreen;
  .aside-menu {
    height: 100%;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  //   background-color: #ccc;
  .avarar-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    .avarar {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin: 0 10px;
    }
  }
}
.main {
  background-color: #e0e0e0;
}
</style>

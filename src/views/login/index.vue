<template>
  <div class="login-container">
    <!-- <div class="loginhead">
    </div> -->
    <el-form class="loginform"
             :model="user"
             :rules="rulesRules"
             ref="userRef">
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile"
                  placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code"
                  placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading"
                   class="loginbtn"
                   type="primary"
                   @click="onLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false // 是否同意协议
      },
      loading: false,
      rulesRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: '请输入正确的号码格式',
            trigger: 'change'
          }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }],
        agree: [{
          validator: (rule, value, callback) => {
            // console.log(value);
            if (value) {
              callback()
            } else {
              callback(new Error('请同意协议'))
            }
          },
          trigger: 'change'
        }]
      }
    }
  },
  created () {},
  methods: {
    onLogin () {
    //   console.log(this.$refs.userRef);
      this.$refs.userRef.validate((valid, err) => {
        console.log(valid);
        console.log(err);
        if (!valid) {
          return
        }
        // 验证通过
        this.login()
      })
      //   const user = this.user
      //   console.log(user);
    },
    login () {
      this.loading = true
      login(this.user).then(res => {
        console.log(res)
        this.$message.success('登陆成功')
        this.loading = false
        // 存储token
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        // 跳转到首页
        this.$router.push({
          name: 'home'
        })
      })
        .catch(err => {
          console.log('登录失败', err)
          this.$message.error('手机或验证码输入有误')
          this.loading = false
        })
    }

  }
}

</script>
<style lang='less' scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: url('./login_bg.jpg') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // .loginhead {
  //     background: url('logo_index.png') no-repeat;
  //     width: 300px;
  //     height: 57px;
  //     margin-bottom: 30px;
  // }
  .loginform {
    background: #fff;
    padding: 50px;
    min-width: 300px;
    .loginbtn {
      width: 100%;
    }
  }
}
</style>

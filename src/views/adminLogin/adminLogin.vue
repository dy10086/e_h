<template>
  <div class="login-container">
    <div class="login-box">
      <img src="~@/assets/img/login_img.jpg" alt />
      <el-form
        class="from-login"
        label-width="50px"
        :model="login"
        :rules="loginRules"
        ref="loginForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input prefix-icon="iconfont icon-user-fill" placeholder="账户" v-model="login.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input prefix-icon="iconfont icon-mima" placeholder="密码" v-model="login.password"></el-input>
        </el-form-item>
        <el-form-item class="bus">
          <el-button type="primary" @click="loginClick">登录</el-button>
          <el-button type="info" @click="ressetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Button, Form, FormItem, Input } from 'element-ui'
import { adminLogin } from '@/network/adminLogin'
export default {
  data() {
    return {
      // 表单数据绑定对象
      login: {
        username: '',
        password: ''
      },
      // 表单验证规则
      loginRules: {
        username: [
          { required: true, message: '请输入账户', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 重置表单内容
    ressetLoginForm() {
      this.$refs.loginForm.resetFields()
    },
    async loginClick() {
      let isLogin = null
      try {
        isLogin = await this.$refs.loginForm.validate()
      } catch (err) {
        isLogin = false
      }
      if (!isLogin) return

      adminLogin(this.login.username, this.login.password).then(res => {
        if (res.data.code !== 2) return this.$message.error(res.data.message)

        this.$message({ message: res.data.message, type: 'success' })
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('user_name',this.login.username)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-color: #324057;
  padding-top: 300px;
}
.login-box {
  width: 400px;
  height: 300px;
  margin: auto;
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  img {
    position: absolute;
    width: 200px;
    height: 200px;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    padding: 4px;
    background-color: #e4e4e4;
    box-shadow: 0 0 10px #ddd;
  }
}
.from-login {
  width: 100%;
  padding: 0 10px;
  position: absolute;
  bottom: 0;
  .bus {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
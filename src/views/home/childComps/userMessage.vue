<template>
  <div class="login-box">
    <img src="http://192.168.0.103:3000/uploads/MO_REN.jpg" alt="头像" />
    <el-dropdown @command="handleCommand">
      <span>{{userName}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="退出">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName:''
    }
  },
  methods: {
    handleCommand(command) {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user_name')
      this.$router.replace('/')
      this.$message.success('退出成功')
    }
  },
  created() {
    this.userName = window.localStorage.getItem('user_name')
  },
}
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  span {
    color: #fff;
    margin: 0 20px;
  }
}
</style>
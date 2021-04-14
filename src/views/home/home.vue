<template>
  <el-container class="box">
    <el-header>
      <div class="header-box">
        <img src="~@/assets/img/login_img.jpg" />
        <span>后台管理系统</span>
      </div>
      <userMessage />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <elMenu_ />
      </el-aside>
      <el-main class="h">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { Container } from 'element-ui'
import elMenu_ from './childComps/elMenu_'
import userMessage from './childComps/userMessage'
export default {
  components: {
    elMenu_,
    userMessage
  }
}
</script>

<style lang="scss" scoped>
.box {
  height: 100vh;
}

.el-header {
  background-color: #555;
  display: flex;
  justify-content: space-between;
  .header-box{
    display: flex;
    align-items: center;
  }
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    padding: 2px;
    box-shadow: 0 0 2px #ddd;
  }
  span {
    margin-left: 10px;
    color: #fff;
    font-size: 26px;
  }
}
.el-aside {
  background-color: rgb(50, 64, 87);
}
</style>
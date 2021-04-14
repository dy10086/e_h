<template>
  <el-menu background-color="#324057" text-color="#fff" unique-opened router>
    <el-menu-item index="/homedata">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-document"></i>
        <span>数据管理</span>
      </template>
      <el-menu-item index="/admindata">管理员列表</el-menu-item>
      <el-menu-item index="/userdata">用户列表</el-menu-item>
      <el-menu-item index="/shopdata">商铺列表</el-menu-item>
      <el-menu-item index="/orderdata">订单列表</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-plus"></i>
        <span>添加数据</span>
      </template>
      <el-menu-item index="/addshops">添加商铺</el-menu-item>
      <el-menu-item index="/addgoods">添加商品</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
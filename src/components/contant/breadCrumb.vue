<template>
  <el-breadcrumb separator="/" v-if="title">
      <el-breadcrumb-item :to="{ path: '/homedata' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{title.left}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:title.path  }"  >{{title.right}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props: {
        title:{
            type:Object,
            default:null
        }
    }
}
</script>

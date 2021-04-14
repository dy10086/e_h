<template>
  <div>
    <breadCrumb :title="compsTitle"/>
    <el-card>
      <headerComp @refresh="searchUser" :headerData="headerData"/>

      <el-table border stripe :data="userList">
        <el-table-column type="expand" label="权限">
          <template slot-scope="props">
            <el-tag :type="props.row.top === 0 ? '' : 'info'">{{ isTop(props.row.top)}}</el-tag>  
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="id" label="id" width="50"></el-table-column>
        <el-table-column prop="username" label="用户"></el-table-column>
        <el-table-column prop="time" label="注册日期"></el-table-column>
        <el-table-column prop="address" label="注册地址"></el-table-column>
        <el-table-column label="操作"> 
          <template slot-scope="scope">
            <!-- 修改用户 删除用户 -->
            <buttonComp :dataJson="scope.row" @refresh="searchUser" :axiosFun="axiosFun"/>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="length_ !== 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagingData.pageNo"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagingData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="length_"
      ></el-pagination>
    </el-card>
    
  </div>
</template>

<script>
import { getUserList,registered,updateuser, removeUser } from '@/network/adminData'

import breadCrumb from '@/components/contant/breadCrumb'
import headerComp from '@/components/contant/headerComp'
import buttonComp from '@/components/contant/buttonComp'

export default {
  components: {
    breadCrumb,
    headerComp,
    buttonComp
    
  },
  data() {
    return {
      
      compsTitle:{
        left:'数据管理',
        right:'管理员列表',
        path:'/admindata'
      },
      headerData:{
        eldtitle:'添加管理员',
        elbCont:'添加管理员',
        registered,
        isBut:true,
        isShow:true
      },
      axiosFun:{
        updateuser,
        removeUser
      },
      userList: [],
      pagingData:{
        pageSize: 10, //一页多少条
        pageNo: 1, //页码
        search:''
      },
      length_: 0, //一共多少条

    }
  },
  created() {
    this.getUserList() 
    
  },
  methods: {
    getUserList() {
      getUserList(this.pagingData).then(res => {       
        this.length_ = res.data.length_
        this.userList = res.data.data
        
      })
    },

    handleSizeChange(newSize) {
      this.pagingData.pageSize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      console.log(newPage);
      
      this.pagingData.pageNo = newPage
      this.getUserList()
    },

    searchUser(username){
      console.log(username);
      
      if(username){
        this.pagingData.search = username
      }else{
        this.pagingData.search = ''
      }
      
      this.getUserList()
    },
    isTop(top){
      return top === 0 ? '草鸡管理员' : '普通管理员'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 10px;
}
.el-card {
  margin-top: 10px;
}
</style>
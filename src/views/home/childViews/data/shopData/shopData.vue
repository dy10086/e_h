<template>
  <div>
    <breadCrumb :title="compsTitle"/>
    <el-card>
      <headerComp @refresh="searchUser" :headerData="headerData"/>
      <!-- <headerChild @refresh="searchUser" /> -->
      <el-table border stripe :data="shopList" >
        <el-table-column type="expand">
          <template slot-scope="props" >
            <tableCardChiild :data="props.row" />
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="id" width="50"></el-table-column>
        <el-table-column prop="img" label="店铺图片" width="150">
          <template slot-scope="sc">
            <img :src="'http://192.168.0.103:3000'+sc.row.img" alt="店铺图片" class="shop-img">
          </template>
        </el-table-column>
        <el-table-column prop="shopname" label="商铺名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="introduce" label="介绍"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改用户 删除用户 -->
            <buttonChild :dataJson="scope.row" @refresh="searchUser"></buttonChild>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="length_ !== 0"
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
import { getShopList } from '@/network/shopData'

import breadCrumb from '@/components/contant/breadCrumb'
import headerComp from '@/components/contant/headerComp'
import buttonChild from './childComps/buttonChild'
import tableCardChiild from './childComps/tableCardChiild'
export default {
  components: {
    breadCrumb,
    headerComp,
    buttonChild,
    tableCardChiild
  },
  data() {
    return {
      compsTitle:{
        left:'数据管理',
        right:'店铺列表',
        path:'/shopdata'
      },
      headerData:{
        eldtitle:'添加店铺',
        elbCont:'添加店铺',
        registered:null,
        isShow:false
      },
      shopList: [],
      pagingData: {
        pageSize: 10, //一页多少条
        pageNo: 1, //页码
        search: ''
      },
      length_: 0 //一共多少条
    }
  },
  created() {
    this.getShopList()
  },
  methods: {
    getShopList() {
      getShopList(this.pagingData).then(res => {
        this.length_ = res.data.length_
        this.shopList = res.data.data
        console.log(this.shopList);
        
      })
    },

    handleSizeChange(newSize) {
      this.pagingData.pageSize = newSize
      this.getShopList()
    },
    handleCurrentChange(newPage) {

      this.pagingData.pageNo = newPage
      this.getShopList()
    },

    searchUser(shopname) {

      if (shopname) {
        this.pagingData.search = shopname
      } else {
        this.pagingData.search = ''
      }

      this.getShopList()
    },

  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 10px;
}
.el-table {
  margin-top: 10px;
}
.shop-img {
  width: 100px;
  height: 100px;
}
</style>
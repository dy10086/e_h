<template>
  <div>
    <breadCrumb :title="title" />
    <el-card class="box-card">
      <el-input v-model="pagingData.search" clearable placeholder="请输入订单号搜索" @clear="getOrderData">
        <el-button slot="append" icon="el-icon-search" @click="getOrderData"></el-button>
      </el-input>
      <el-table :data="tableData" style="width: 100%" row-class-name="warning-row">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="ul-box">
              <ul>
                <li>
                  用户id:
                  <span>{{props.row.user_id}}</span>
                </li>
                <li>
                  用户名:
                  <span>{{props.row.username}}</span>
                </li>
                <li>
                  用户地址:
                  <span>{{props.row.address_user}}</span>
                </li>
              </ul>
              <ul>
                <li>
                  商铺id:
                  <span>{{props.row.shops_id}}</span>
                </li>
                <li>
                  商铺id:
                  <span>{{props.row.shopname}}</span>
                </li>
                <li>
                  商铺地址:
                  <span>{{props.row.address_shops}}</span>
                </li>
              </ul>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="order_number" label="订单号"></el-table-column>
        <el-table-column prop="username" label="下单用户"></el-table-column>
        <el-table-column prop="price" label="订单价格"></el-table-column>
        <el-table-column prop="state" label="订单状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              :disabled="isBut(scope.row.state)"
              @click="updState(scope.row.order_number,scope.$index)"
            >完成订单</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delOrder(scope.row.order_number,scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagingData.pageNo"
        :page-sizes="[2, 10]"
        :page-size="pagingData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from '@/components/contant/breadCrumb'
import { getOrderData, updState, delOrder } from '@/network/orderData'
export default {
  components: {
    breadCrumb
  },
  data() {
    return {
      title: {
        left: '数据管理',
        right: '订单列表',
        path: '/roderdata'
      },

      tableData: [],
      total: 0,
      pagingData: {
        pageSize: 10, //一页多少条
        pageNo: 1, //页码
        search: ''
      }
    }
  },
  created() {
    this.getOrderData()
  },
  methods: {
    async getOrderData() {
      let res = await getOrderData(this.pagingData)
      this.tableData = res.data.data
      this.total = res.data.count
    },

    async updState(order_number, index) {
      let res = await updState(order_number)
      this.$message.success(res.data.message)
      this.tableData[index].state = '已完成'
    },

    delOrder(order_number, index) {
      this.$confirm('此操作无法返回，确认删除吗').then(async () =>{
        let res = await delOrder(order_number)
        this.$message.success(res.data.message)
        this.tableData.splice(index,1)
        
      }).catch(() =>{
        this.$message('已取消删除')
      })
      
    },
    handleSizeChange(newSize) {
      this.pagingData.pageSize = newSize
      this.getOrderData()
    },
    handleCurrentChange(newPage) {
      this.pagingData.pageNo = newPage
      this.getOrderData()
    },

    isBut(info) {
      if (info === '未完成') {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 10px;
}
.el-input {
  width: 500px;
}
.ul-box {
  display: flex;
  flex-wrap: nowrap;
  border: 1px solid #e4e4e4;
  border-radius: 6px;
  padding: 4px;
  ul {
    width: 50%;
    list-style: none;
  }
  li {
    line-height: 30px;
    font-weight: 800;
    span {
      margin-left: 10px;
      font-weight: 400;
    }
  }
}
</style>
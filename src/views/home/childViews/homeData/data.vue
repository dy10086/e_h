<template>
  <div class="data-box">
    <ul>
      <li>当日数据</li>
      <li v-for="item in newData" :key="item.name">
        <span>{{item.count}}</span>{{item.name}}
      </li>
    </ul>
    <ul>
      <li>总数据</li>
      <li v-for="item in totalData" :key="item.name">
        <span>{{item.total}}</span>{{item.name}}
      </li>
    </ul>
    <div ref="main" style="width: 800px;height:400px;" class="data"></div>
  </div>
</template>

<script>
import { getChart,getData } from '@/network/homeData'
import echarts from 'echarts'
export default {
  data() {
    return {
      option: null,
      totalData:[],
      newData:[]
    }
  },
  async mounted() {
    let res = await getChart()
    var myChart = echarts.init(this.$refs.main)

    myChart.setOption(res.data.option)
    console.log(res.data.option);
  },
  created() {
    this.getData()
  },
  methods: {
    async getData(){
      let res = await getData()
      this.totalData = res.data.totalData
      this.newData = res.data.newData
      
      
    }
  },
}
</script>

<style lang="scss" scoped>
.data-box {
  width: 100%;
  .data {
    margin: 100px auto;
  }
  ul {
    overflow: hidden;
    list-style: none;
    width: 800px;
    margin: 0 auto;
    display: flex;
  }
  ul:nth-of-type(2) {
    margin-top: 60px;
    li:nth-of-type(1) {
      background-color: #67c23a;
    }
  }
  li {
    float: left;
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #909399;

    span {
      font-size: 24px;
      margin-right: 10px;
    }
  }
  li:nth-of-type(1) {
    background-color: #f56c6c;
  }
}
</style>
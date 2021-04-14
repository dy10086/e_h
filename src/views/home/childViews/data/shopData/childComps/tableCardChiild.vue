<template>
  <el-card v-if="newData">
    <el-row>
      <el-col :span="12" v-for="(value,key) in newData" :key="key">
        <i>{{newKeyFun(key)}}</i>
        <span>{{value}}</span>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      newKey: {
        id: 'id',
        shopname: '商铺',
        address: '地址',
        introduce: '介绍',
        phone: '手机号',
        species: '分类',
        score: '评分',
        sales: '销量'
      },
      newData: {}
    }
  },
  watch: {
    data: {
      handler() {
        for (let key in this.data) {
          this.newData[key] = this.data[key]
        }
        this.obj()
      },
      immediate: true
    }
  },
  methods: {
    newKeyFun(key) {
      return this.newKey[key] + ':'
    },
    obj() {
      for (let key in this.newData) {
        if (!(key in this.newKey)) {
          delete this.newData[key]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
i {
  font-style: normal;
  font-weight: 900;
  display: inline-block;
  width: 60px;
  margin-bottom: 10px;
}
span {
  overflow: hidden;
}
</style>
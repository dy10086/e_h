<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" @click="shopModify"></el-button>
    <el-button type="danger" icon="el-icon-delete" @click="removebut"></el-button>
  </div>
</template>

<script>
import { removeShop } from '@/network/shopData'
export default {
  props: {
    dataJson: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    shopModify(){
      this.$store.commit('shopData',this.dataJson)
      this.$store.commit('isUpShop',true)
      this.$router.push('/addshops')
    },
    removebut() {
      this.$confirm('确认删除商铺吗，此操作不可逆！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          console.log(11);
          
          let res = await removeShop(this.dataJson.id)
          console.log(res.data);
          
          if (res.data.code !== 200)
            return this.$message.error(res.data.message)
          this.$message.success(res.data.message)
          this.$emit('refresh')
        })
        .catch(() => {
          this.$message('已取消删除')
        })
    }
  }
}
</script>

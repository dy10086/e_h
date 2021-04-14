<template>
  <div>
    <el-button type="primary" icon="el-icon-edit" @click="userModify"></el-button>
    <el-button type="danger" icon="el-icon-delete" @click="removebut"></el-button>
    <el-dialog title="修改用户" :visible.sync="isShow" width="30%" @close="dialogClose">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="ruleForm"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="putUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { updateuser, removeUser } from '@/network/adminData'
export default {
  props: {
    dataJson: {
      type: Object,
      default: null
    },
    axiosFun:{
        type:Object,
        default:null
    }
  },
  data() {
    return {
      isShow: false,
      addForm: {
        username: '',
        password: ''
      },
      // 表单规则
      addRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    userModify() {
      this.isShow = true
      this.addForm.username = this.dataJson.username
    },
    dialogClose() {
      this.$refs.ruleForm.resetFields()
    },
    putUser() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return
        let result = await this.axiosFun.updateuser(this.dataJson.id, this.addForm.password)
        if (result.data.code !== 200)
          return this.$message.error(result.data.message)
        this.$message.success(result.data.message)
        this.dialogClose()
        this.isShow = false
      })
    },
    removebut() {
      this.$confirm('确认删除用户吗，此操作不可逆！', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await this.axiosFun.removeUser(this.dataJson.id)
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

<style>
</style>
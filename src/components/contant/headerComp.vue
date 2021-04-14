<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input v-model="username" clearable @clear="refreshData" placeholder="请输入内容">
          <el-button slot="append" icon="el-icon-search" @click="refreshData"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6" v-if="headerData.isBut">
        <el-button type="primary" icon="el-icon-plus" @click="addUser">{{headerData.elbCont}}</el-button>
      </el-col>
    </el-row>
    <el-dialog v-if="headerData.isShow" :title="headerData.eldtitle" :visible.sync="isShow" width="30%" @close="dialogClose">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="userRuleForm"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="registered">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
props:{

  headerData:{
    type:Object,
    default:null,
  }
  // el-dialog的title
  // eldtitle
  // el-button的内容
  // elbCont
},
  data() {
    return {
      isShow: false,
      username: '',
      // 表单的信息
      addForm: {
        username: '',
        password: ''
      },
      // 表单规则
      addRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addUser() {
      if(!this.headerData.registered) return this.$router.push('/addshops')
      this.isShow = true
    },
    // 搜索用户，或者清除搜索款都可以调用,刷新表格信息
    refreshData() {
      this.$emit('refresh', this.username)
    },
    // 清除输入款的内容
    dialogClose() {
      this.$refs.userRuleForm.resetFields()
    },
    //注册
    registered() {
      
      this.$refs.userRuleForm.validate(async valid => {
        if(!valid) return

        let time_ = new Date().getTime()
        let res = await this.headerData.registered(this.addForm,time_)

        if(res.data.code !== 200) return this.$message.error(res.data.message)
        this.$message.success(res.data.message)
        this.isShow = false
        this.refreshData()
      })
    }
  }
}
</script>

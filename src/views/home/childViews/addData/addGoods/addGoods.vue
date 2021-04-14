<template>
  <div>
    <breadCrumb :title="CompsTitle" />
    <el-card>
      <el-form ref="form" :model="goodsFrom" label-width="100px" :rules="rules">
        <el-form-item label="添加商品店铺">
          <el-select v-model="shopIdObj" value-key="value" placeholder="请选择" @change="getclassify">
            <el-option v-for="item in shopOptions" :key="item.id" :label="item.value" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品分类" prop="classify">
          <el-select v-model="goodsFrom.classify" :placeholder="placeholder">
            <el-option
              v-for="item in classifyOptions"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
          <el-button
            type="primary"
            size="mini"
            class="class-button"
            @click="classButton"
            :disabled="isAdd"
          >编辑分类</el-button>
        </el-form-item>
        <el-form-item label="食品名" prop="name">
          <el-input v-model="goodsFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="食品描述" prop="describe">
          <el-input v-model="goodsFrom.describe"></el-input>
        </el-form-item>
        <el-form-item label="食品图片">
          <upload
            actionUrl="http://192.168.0.103:3000/api/addgoods"
            actionName="com"
            @formData="getFormData"
            ref="upload"
          />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="goodsFrom.price" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="包装费" prop="packing">
          <el-input-number v-model="goodsFrom.packing" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="食品标签" prop="label">
          <el-select v-model="goodsFrom.label" placeholder="请选择食品标签">
            <el-option
              v-for="item in labeloptions"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="box">
          <el-button type="info" @click="resetFields">重置</el-button>
          <el-button type="primary" @click="addGoods">添加</el-button>
        </div>
      </el-form>
    </el-card>

    
    <el-dialog title="提示" :visible.sync="visible" width="30%" :before-close="handleClose">
      <el-collapse>
        <el-collapse-item title="添加分类" name="1">
          <el-input v-model="classifyInput" placeholder="请输入分类名"></el-input>
          <div class="add-classify-box">
            <el-button type="primary" @click="addClassify">添 加</el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item title="删除分类" name="2">
          <el-select v-model="delValue" placeholder="请选择">
            <el-option
              v-for="item in classifyOptions"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            class="del-button"
            :disabled="isDisabled"
            @click="delClassify"
          ></el-button>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>
  </div>
</template>

<script>
import {
  getShopsId,
  getclassify,
  addGoods,
  addClassify,
  delClassify
} from '@/network/addGoods'
import breadCrumb from '@/components/contant/breadCrumb'
import upload from '@/components/common/upload'
export default {
  components: {
    breadCrumb,
    upload
  },
  created() {
    this.getShopsId()
  },
  data() {
    return {
      CompsTitle: {
        left: '添加数据',
        right: '添加商品',
        path: '/addgoods'
      },
      shopIdObj: {},
      shopOptions: [],
      classifyOptions: [],
      goodsFrom: {
        classify: '',
        name: '',
        describe: '',
        price: 0,
        packing: 0,
        label: ''
      },
      rules: {
        name: [{ required: true, message: '请输入食品名', trigger: 'blur' }]
      },
      placeholder: '当前没有食品分类',
      formData: null,
      labeloptions: [{ value: '新品' }, { value: '招牌' }],

      visible: false,
      classifyInput: '',
      delValue: ''
    }
  },
  methods: {
    // 请求数据函数
    async getShopsId() {
      let res = await getShopsId()
      if (res.data.code !== 200)
        return this.$message.error('获取商铺名和id失败')
      this.shopOptions = res.data.options
    },

    async getclassify() {
      this.goodsFrom.id = this.shopIdObj.id
      let res = await getclassify(this.shopIdObj.id)
      if (!res.data.classify) {
        this.classifyOptions = []
        this.placeholder = '当前没有食品分类'
        return
      }
      this.placeholder = '请选择'
      this.classifyOptions = res.data.classify
    },

    getFormData(formData) {
      this.formData = formData
    },

    resetFields() {
      this.$refs.form.resetFields()
      this.$refs.upload.imgIsN()
    },

    addGoods() {
      this.$refs.form.validate(async res => {
        if (!res) return this.$message.error('请确认是否填写正确')
        if(this.goodsFrom.name === '') return this.$message.error('请选择分类')
        if (!this.formData) this.$message.error('请上传图片')
        this.formData.set('data', JSON.stringify(this.goodsFrom))
        let result = await addGoods(this.formData)
        if (result.data.code !== 200) {
          this.$message.error('未知错误')
        } else {
          this.$message.success(result.data.message)
        }
        this.resetFields()
      })
    },

    classButton() {
      this.visible = true
    },

    async addClassify() {
      if (this.classifyInput === '') return this.$message.error('无效添加')
      if (!this.goodsFrom.id) return this.$message.error('不存在店铺')
      let res = await addClassify(this.goodsFrom.id, this.classifyInput)
      if (res.data.code !== 200) return this.$message.error(this.data.message)
      this.$message.success(res.data.message)
      this.getclassify()
    },

    async delClassify() {
      let res = await delClassify(this.goodsFrom.id,this.delValue)
      if(res.data.code !== 200) return this.$message.error(res.data.message)
      delete this.classifyOptions[this.delValue]
      this.delValue = ''
      this.$message.success(res.data.message)
    },

    handleClose() {
      this.visible = false
      this.classifyInput = ''
      this.delValue = ''
    }
  },
  computed: {
    isDisabled() {
      return this.classifyOptions.length === 0 || !this.delValue ? true : false
    },
    isAdd() {
      return Object.keys(this.shopIdObj).length !== 0 ? false : true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.box {
  display: flex;
  justify-content: flex-end;
}
.class-button {
  margin-left: 10px;
}
.add-classify-box {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.del-button {
  margin-left: 10px;
}
</style>
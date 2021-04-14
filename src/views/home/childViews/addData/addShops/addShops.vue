<template>
  <div>
    <breadCrumb :title="compsTitle" />
    <el-card>
      <div class="box">
        <el-form :model="ruleForm" :rules="rules" ref="shopForm" label-width="100px">
          <el-form-item label="店铺名称" prop="shopname">
            <el-input v-model="ruleForm.shopname"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="addressObj">
            
            <el-select
              v-model="ruleForm.addressObj"
              value-key="title"
              filterable
              remote
              placeholder="请输入地址信息"
              :remote-method="remoteMethod"
              class="address"
            >
              <el-option
                v-for="item in cityOptions"
                :key="item.title"
                :label="item.title"
                :value="item"
                
              >
              </el-option>
            </el-select>
            <p>
              当前位置：
              <span class="city">{{city}}</span>
            </p>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" prop="introduce">
            <el-input v-model="ruleForm.introduce"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类" prop="species">
            <el-select
              v-model="ruleForm.species"
              multiple
              filterable
              allow-create
              placeholder="请选择店铺分类标签"
              :multiple-limit="2"
            >
              <el-option
                v-for="item in optionsClass"
                :key="item.value"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="店铺服务" prop="valueService">
            <el-select
              v-model="ruleForm.valueService"
              multiple
              filterable
              allow-create
              placeholder="请选择店铺服务标签"
              
            >
              <el-option
                v-for="item in optionService"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配送费" prop="psf">
            <el-input-number v-model="ruleForm.psf" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价" prop="qsj">
            <el-input-number v-model="ruleForm.qsj" :min="0"></el-input-number>
          </el-form-item>
          <el-row>
            <el-col :span="10">
              <el-form-item label="营业时间" prop="startTime">
                <el-time-select
                  v-model="ruleForm.startTime"
                  :picker-options="pickerOptions"
                  placeholder="开始时间"
                ></el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item prop="endTime">
                <el-time-select
                  v-model="ruleForm.endTime"
                  :picker-options="pickerOptions"
                  placeholder="结束时间"
                ></el-time-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="店铺图片">
            <upload
              actionUrl="http://192.168.0.103:8080/api/regshop"
              actionName="com"
              ref="upSub"
              @formData="formData"
            />
          </el-form-item>
          <el-form-item label="优惠活动">
            <el-select v-model="activityValue" placeholder="请选择" @change="isShow = true">
              <el-option
                v-for="item in optionsActivity"
                :key="item.location"
                :value="item.value"
                
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-table :data="activityTable" style="width: 100%">
              <el-table-column prop="name" label="活动名称"></el-table-column>
              <el-table-column prop="details" label="活动详情"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="prop">
                  <el-button type="danger" icon="el-icon-delete" circle @click="delTable(prop.row)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item class="bus">
            <el-button type="primary" @click="addshop">立即创建</el-button>
            <el-button @click="resetClick">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-dialog title="添加活动" :visible.sync="isShow" width="30%" @close="clDia">
      <el-input v-model="activityData" placeholder="请输入活动详情"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="addActivity">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getShopOption, regShopData, getCity,getAddress } from '@/network/addShops'
import breadCrumb from '@/components/contant/breadCrumb'
import upload from '@/components/common/upload'
export default {
  components: {
    breadCrumb,
    upload
  },
  data() {
    // 自定义手机验证规则
    function checkMobile(rule, value, cb) {
      let patrn = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/
      if (patrn.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {
      compsTitle: {
        left: '添加数据',
        right: '添加商铺',
        path: '/addshops'
      },
      ruleForm: {
        shopname: '',
        addressObj: {},
        phone: '',
        introduce: '',
        species: [],
        valueService: [],
        psf: 0,
        qsj: 0,
        startTime: 0,
        endTime: 0
      },
      rules: {
        shopname: [
          { required: true, message: '请输入商铺名称', trigger: 'blur' },
          { min: 0, max: 35, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        addressObj: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 分类
      optionsClass: [],
      // 服务
      optionService: [],
      // 活动
      optionsActivity: [
        {
          value: '满减优惠'
        },
        {
          value: '优惠大酬宾'
        },
        {
          value: '新用户立减'
        },
        {
          value: '进店领券'
        }
      ],
      pickerOptions: {
        start: '08:30',
        step: '00:15',
        end: '18:30'
      },
      activityValue: '',
      activityData: null,
      isShow: false,
      activityTable: [],

      imageUrl: '',
      formD: null,

      city: '',
      cityOptions:[]
    }
  },
  created() {
    this.getShopOption()
    this.getCity()
  },
  mounted() {
    if (this.$store.state.isUpShop) {
      console.log(this.$store.state.shopData)

      this.ruleForm = Object.assign(this.ruleForm, this.$store.state.shopData)
      console.log(this.ruleForm)

      this.ruleForm.species = []

      this.$store.commit('shopData', null)
      this.$store.commit('isUpShop', false)
    } else {
      this.$refs.shopForm.resetFields()
    }
  },
  methods: {
    // 数据请求函数
    async getShopOption() {
      let res = await getShopOption()
      this.optionsClass = res.data.optionsClass
      this.optionService = res.data.optionService
    },
    async getCity() {
      let res = await getCity()
      this.city = res.data.cityMessage.district
    },
    addActivity() {
      if (!this.activityData) return this.$message.error('请输入活动详情')
      this.activityTable.push({
        name: this.activityValue,
        details: this.activityData
      })
      this.isShow = false
    },
    // Dialog关闭时销毁数据
    clDia() {
      this.activityData = null
    },
    delTable(obj) {
      this.activityTable.splice(obj, 1)
    },
    addshop() {
      this.$refs.shopForm.validate(async results => {
        if (!results) return this.$message.error('请确认是否填写正确')
        this.ruleForm.activity = this.activityTable

        let res = ''
        if (this.formD) {
          let ruleForm = JSON.stringify(this.ruleForm)
          this.formD.set('data', ruleForm)
          this.formD.set('isIf', true)
          console.log('aa');
          
          res = await regShopData(this.formD)
        } else {
          res = await regShopData(this.ruleForm)
        }

        if (res.data.code !== 200) return this.$message.error(res.data.message)
        this.$message.success(res.data.message)
        this.$refs.shopForm.resetFields()
        this.$refs.upSub.imgIsN()
      })
    },
    resetClick() {
      this.$refs.shopForm.resetFields()
      this.$refs.upSub.imgIsN()
      this.activityTable = []
    },
    formData(formData) {
      this.formD = formData
    },
    async remoteMethod(value){
      let res = await getAddress(value,this.city)
      this.cityOptions = res.data.address 
    },
    
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 10px;
}
.box {
  width: 600px;
  margin: 0 auto;
}
.bus {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
.sele {
  margin-left: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #8c939d;
}
.avatar {
  width: 178px;
  height: 178px;

  display: block;
}
.city {
  font-size: 18px;
  color: #a7b0b9;
}
.address {
  width: 100%;
}
</style>
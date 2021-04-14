<template>
  <form :action="actionUrl" method="post" enctype="multipart/form-data" :style="isStyle">
    <input v-show="!imgUrl" type="file" :name="actionName" class="file" @change="fileChe" ref="refFile">
    <img v-show="imgUrl" :src="imgUrl" @click="imgClick">
    <input type="submit" ref="subBus" class="bus">
  </form>
</template>

<script>
export default {
    props:{
        actionUrl:{
            type:String,
        },
        actionName:{
            type:String,
        }
    },
    data() {
        return {
            imgUrl:null
        }
    },
    computed: {
        isStyle(){
            return !this.imgUrl ? '' : 'border : none'
        }
    },
    methods: {
        fileChe(){
            if(this.$refs.refFile.files[0]){
                let formData = new window.FormData()
                let file = this.$refs.refFile.files[0]
                this.imgUrl = window.webkitURL.createObjectURL(file)
                formData.append(this.actionName,file)
                this.$emit('formData',formData)
            }
            
        },

        submit(){
            this.$refs.subBus.click()
        },

        imgClick(){
            
            this.$refs.refFile.click()
            
        },

        imgIsN(){
            this.imgUrl = null
            this.$emit('formData',null)
        }
    },

}
</script>

<style scoped>
    form {
        position: relative;
        display: block;
        width: 100px;
        height: 100px;
        border: 1px dashed #979393;
    }
    img {
        position: absolute;
        width: 100px;
        height: 100px;
        margin: 0;
        padding: 0;
        display: block;
        z-index: 99;
        cursor: pointer;
    }
    .file {
        
        position: relative;
        z-index: 99;
        display: block;
        width: 100px;
        height: 100px;
        opacity:0;
        background-color: rgba(97, 67, 67,0);
        color: rgba(97, 67, 67,0);
        outline: none;
        cursor: pointer;
    }
    .file input {
        background-color: pink;
    }
    form::after {
        content: '+';
        display: block;
        color: rgb(129, 123, 123);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        font-size: 50px;
        
    }
    .bus {
        display: none;
    }
</style>
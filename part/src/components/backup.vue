<template>
<div class="upload">
<el-upload
  action="#"
  list-type="picture-card"
  :auto-upload="false" 
  :on-progress="u"
 
  >
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}" >
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="toBase64(file)"
        >
          <i class="el-icon-printer"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    
    </div>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>

<p>点击上传图像</p>
</div>  

</template>

<script>
import $ from 'jquery'
var qs = require("qs");
const https = require('https');
var unirest = require('unirest');
export default {
  data() {  
　　return {
        headImg:"",
        imageUrl: "",
        type:'',
　　　　dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        respStore:null,
        hello:null
　　};
},
watch:{
  respStore(){
    
    this.hello = this.respStore._body

  }
},

methods: { 
  toBase64(){
      var that = this
      var file = document.querySelector('input[type=file]').files[0];
      console.log("base64",file)
      var reader = new FileReader();
      reader.onloadend = function () {
          $("#base64Img").attr("style","display:inline-block");
          $("#base64Img").attr("src",reader.result);
          var result = (reader.result).split(",")[1];
          
          that.imageUrl = reader.result
          that.updataImg(result)
      }
      if (file) {
          reader.readAsDataURL(file);
      }
    },
    updataImg(base64){
      this.respStore = unirest.post("https://218.89.171.168:31218/classification").strictSSL(false).field('image', base64)
    .end(function (res) { 
 
     });
    let ss = this.respStore._body
    
     console.log('--body---',ss)
     
     console.log('-----',this.hello)
      console.log('--00000---',this.hello[0])
      console.log('--00000---',String.fromCharCode.apply(null,this.hello[0]))
    
    
    
    },
      u(event, file, fileList) {
        console.log(event, file, fileList);
      },
      handleRemove(file) {
        console.log('删除',file);
        
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
}
</script>
 
<style scoped>
.upload{
  padding: 20px 20px 100px 20px;
  position: relative;
  width: 1000px;
  margin: 0 auto;
  list-style: none;
  text-align: center;
}
</style>
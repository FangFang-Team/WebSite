<template>
<div class="upload">
<el-upload
  action="#"
  list-type="picture-card"
  :auto-upload="false" 
  :on-progress="u"
  class="test"
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
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
  
    </div>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <div>
  <img x="0" y="0" width="100%" height="100%" :src="dialogImageUrl" alt=""  @click="leftClick" @contextmenu.prevent="rightClick($event)"/>
  </div>
</el-dialog>

<p>点击上传图像</p> 
<el-button class="button" @click="toBase64(file)">开始解译</el-button> 
<el-button class="button" @click="Base64(file)">交互式标注</el-button> 

<p v-for="results in msg">{{results.keyword}}  &nbsp{{results.score}}</p>


        
<img :src="this.res_base64" />

</div>  

</template>

<script>
import $ from 'jquery'
var qs = require("qs");
const https = require('https');
var axios = require('axios');
let Base64 = require('js-base64').Base64
var fs = require("fs");  // 引入fs模块
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default {
  name: 'functions',
  data() {  
　　return {
        headImg:"",
        imageUrl: "",
        type:'',
　　　　dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        respStore:null,
        msg:null,
        results:[],
        res_base64:""
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
      console.log("base64--------",file)
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
      console.log(base64.toString())
      const data1 = {'image':base64}
      var that = this;
      axios({
        
        method: 'post',
        url: 'https://218.89.171.168:31218/classification',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data:qs.stringify(data1)
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(response.data.result.length)
        for(var i=0;i<response.data.result.length;i++){
          that.msg = response.data.result;
          that.results = response.data.result[i];
          console.log(that.results)
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
},
      Base64(){
          var that = this
          var file = document.querySelector('input[type=file]').files[0];
          console.log("base64--------",file)
          var reader = new FileReader();
          reader.onloadend = function () {
              $("#base64Img").attr("style","display:inline-block");
              $("#base64Img").attr("src",reader.result);
              var result = (reader.result).split(",")[1];    
              that.imageUrl = reader.result
              that.updataImg1(result)
          }
          if (file) {
              reader.readAsDataURL(file);
          }
        },
      updataImg1(base64){
          console.log(base64.toString())
          const data1 = {'image':base64}
          var that = this;
          axios({
            
            method: 'post',
            url: 'https://218.89.171.168:31218/label/upload_image',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data:qs.stringify(data1)
          })
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(response.data.result.length)
            for(var i=0;i<response.data.result.length;i++){
              that.msg = response.data.result;
            }
            
          })
          .catch(function (error) {
            console.log(error);
          });
      },
          //右鼠标单击显示坐标
      rightClick(et){
            var that = this;
            et =  window.event;
            //获取相对于当前所指向对象的位置坐标
            var X = et.offsetX
            var Y = et.offsetY
            that.updataXYR(X,Y,0)
      },
      //左鼠标单击显示坐标
      leftClick(event) {
            var that = this;
            event =  window.event;
            //获取相对于当前所指向对象的位置坐标
            var X = event.offsetX
            var Y = event.offsetY
            that.updataXYI(X,Y,1)
          },
          updataXYR(X,Y,is_positive){
            const data3 = {'x':X,'y':Y,'is_positive':0}
            console.log(data3)
            var that = this;
            axios({
              
              method: 'post',
              url: 'https://218.89.171.168:31218/label/add_click',
              headers: { 'content-type': 'application/x-www-form-urlencoded' },
              data:qs.stringify(data3)
            })
          //   .then(function (response) {
          //   console.log(JSON.stringify(response.data));
          //   console.log(response.data.result.length)
          //   for(var i=0;i<response.data.result.length;i++){
          //     that.msg = response.data.result;
          //     that.results1 = response.data.result[i].keyword,
          //     that.results2 = response.data.result[i].score
          //     console.log(that.results1,that.results2)
          //   }
            
          // })
            .catch(function (error) {
              console.log(error);
            });
          },
          updataXYI(X,Y,is_positive){
          const data3 = {'x':X,'y':Y,'is_positive':1}
          console.log(data3)
          var that = this;
          axios({
            
            method: 'post',
            url: 'https://218.89.171.168:31218/label/add_click',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data:qs.stringify(data3)
          })
          .then(function (response) {
            console.log(response.data.image_base64);
            that.res_base64 = "data:image/jpeg;base64,"+response.data.image_base64;
            console.log(that.res_base64)
            // var pic = Base64.decode('response.data.image_base64') // delivery_asn=1
            // console.log(pic)
    //         var path = '@assets/img'+Date.now() +'.png';//路径从app.js级开始找--
    //         var base64 = response.data.image_base64; //去掉图片base64码前面部分data:image/png;base64
    //         var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    //         console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer)); // 输出是否是buffer对象
    //         fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
    //           if(err){
    //               console.log(err);
    //           }else{
    //               console.log('写入成功！');
    //           }
    // });
            // for(var i=0;i<response.data.result.length;i++){
            //   that.msg = response.data.result;
            //   that.results1 = response.data.result[i].keyword,
            //   that.results2 = response.data.result[i].score
            //   console.log(that.results1,that.results2)
            // }
            
          })
          .catch(function (error) {
            console.log(error);
          });
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
.test{
  position:relative;
  margin-top: 7%;
}
.button{
  position: relative;
  margin-top: 5%;
}
</style>
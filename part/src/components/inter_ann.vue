<template>
<div>
  <div>
    <img :src="img" class="main_pic" @click="leftClick" @contextmenu.prevent="rightClick($event)" alt="">
    
  </div>
  <img :src="this.res_base64" class="cover" @click="leftClick" @contextmenu.prevent="rightClick($event)" alt="">
  </div>
</template>
<script>
import $ from 'jquery'
var qs = require("qs");
const https = require('https');
var axios = require('axios');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
export default {
    name:"inter_ann",
  data() {
    return {
      img:'',
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
  created() {
    this.getRouterData();
  },
  methods: {
    getRouterData() {
      this.img = this.$route.params.img;
      console.log("img", this.img);
    },
    Base64(){
          var that = this
          var file = this.res_base64;
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
    rightClick(et){
            var that = this;
            et =  window.event;
            //获取相对于当前所指向对象的位置坐标
            var X = et.offsetX
            var Y = et.offsetY
            that.updataXYR(X,Y,0)
            console.log(X)
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
  },
};
</script>
<style>
.main_pic{
 position: relative;
  margin-left: 30%;
  z-index: 0;
}
.cover{
   position: relative;
  margin-left: 30%;
  margin-top: -100%;
  z-index: 111;
}
</style>
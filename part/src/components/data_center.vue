<template>
  <div>
    <el-page-header @back="goBack" content="数据中心"></el-page-header>
    <div class="upload1">
      <input type="file" id="file" multiple @change="upload1" />
    </div>
    <div class="upload2">
      <input type="file" id="file" multiple @change="upload2" />
    </div>
    <ul class="view1">
      <li v-for="(item, index) in pic" :key="index">
        <img :src="item" @click="toBase64(file),routeto(index)" id="street" alt="">
        <div class="delect" title="删不了我" @click="noDelect">×</div>
      </li>
      </ul>

     <ul class="view2">  
      <li v-for="(item, index) in list" :key="index">
        <img :src="item" @click="routerTo(index), Base64(file)" />
        <div class="delect" @click="delect(index)">×</div>
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
var qs = require("qs");
const https = require("https");
var axios = require("axios");
let Base64 = require("js-base64").Base64;
var fs = require("fs"); // 引入fs模块
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export default {
  name: "data_center",
  data() {
    return {
      pic: [],
      list: [],
      headImg: "",
      imageUrl: "",
      type: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      respStore: null,
      msg: null,
      results: [],
      res_base64: "",
    };
  },
  methods: {
    goBack() {
      this.$router.push("/Home");
    },
    upload1(e) {
      //e.target指向事件执行时鼠标所点击区域的那个元素，那么为input的标签，
      // 可以输出 e.target.files 看看，这个files对象保存着选中的所有的图片的信息。
      console.log(e.target.files);
      //------------------------------------------------------
      // 既然如此，循环这个files对象，用for of 循环，
      for (let item of e.target.files) {
        //正则表达式，判断每个元素的type属性是否为图片形式，如图
        if (!/image\/\w+/.test(item.type)) {
          // 提示只能是图片，return
          alert("只能选择图片");
          return;
        }
        // 保存下当前 this ，就是vue实例
        var _this = this;
        //  创建一个FileReader()对象，它里面有个readAsDataURL方法
        let reader = new FileReader();
        // readAsDataURL方法可以将上传的图片格式转为base64,然后在存入到图片路径,
        //这样就可以上传电脑任意位置的图片
        reader.readAsDataURL(item);
        //文件读取成功完成时触发
        reader.addEventListener("load", function () {
          //  reader.result返回文件的内容。
          //只有在读取操作完成后，此属性才有效，返回的数据的格式取决于是使用哪种读取方法来执行读取操作的。
          //给数组添加这个文件也就是图片的内容
          _this.pic.push(this.result);
        });
      }
      //------------------------------------------------------------
    },
    upload2(e) {
      //e.target指向事件执行时鼠标所点击区域的那个元素，那么为input的标签，
      // 可以输出 e.target.files 看看，这个files对象保存着选中的所有的图片的信息。
      console.log(e.target.files);
      //------------------------------------------------------
      // 既然如此，循环这个files对象，用for of 循环，
      for (let item of e.target.files) {
        //正则表达式，判断每个元素的type属性是否为图片形式，如图
        if (!/image\/\w+/.test(item.type)) {
          // 提示只能是图片，return
          alert("只能选择图片");
          return;
        }
        // 保存下当前 this ，就是vue实例
        var _this = this;
        //  创建一个FileReader()对象，它里面有个readAsDataURL方法
        let reader = new FileReader();
        // readAsDataURL方法可以将上传的图片格式转为base64,然后在存入到图片路径,
        //这样就可以上传电脑任意位置的图片
        reader.readAsDataURL(item);
        //文件读取成功完成时触发
        reader.addEventListener("load", function () {
          //  reader.result返回文件的内容。
          //只有在读取操作完成后，此属性才有效，返回的数据的格式取决于是使用哪种读取方法来执行读取操作的。
          //给数组添加这个文件也就是图片的内容
          _this.list.push(this.result);
        });
      }
      //------------------------------------------------------------
    },
    delect(index) {
      console.log(index);
      this.list.splice(index, 1);
    },
    // 这是默认图片的方法，弹出默认图片无法删除
    noDelect() {
      alert("默认图片无法删除。");
    },
    routeto(index){
      console.log("0000000000000000", this.pic[index]);
      this.$router.push({
        name: `street_v_c`,
        params: {
          img: this.pic[index],
          result:this.results
        },
      });
    },
    routerTo(index) {
      console.log("0000000000000000", this.list[index]);
      this.$router.push({
        name: `inter_ann`,
        params: {
          img: this.list[index]
        },
      });
    },
    toBase64(){
      var that = this
      var file = document.querySelector("input[type=file]").files[0];
      console.log("base64--------",file)
      var reader = new FileReader();
      reader.onloadend = function () {
          $("#base64Img").attr("style","display:inline-block");
          $("#base64Img").attr("src",reader.result);
          var result = (reader.result).split(",")[1];    
          that.imageUrl = reader.result
          console.log(!!!result)
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
    Base64() {
      var that = this;
      var file = document.querySelector("input[type=file]").files[0];
      console.log("base64--------", file);
      var reader = new FileReader();
      reader.onloadend = function () {
        $("#base64Img").attr("style", "display:inline-block");
        $("#base64Img").attr("src", reader.result);
        var result = reader.result.split(",")[1];
        that.imageUrl = reader.result;
        that.updataImg1(result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    updataImg1(base64) {
      console.log(base64.toString());
      const data1 = { image: base64 };
      var that = this;
      axios({
        method: "post",
        url: "https://218.89.171.168:31218/label/upload_image",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data: qs.stringify(data1),
      }).then(function (response) {
        console.log(JSON.stringify(response.data));
        console.log(response.data.result.length);
        for (var i = 0; i < response.data.result.length; i++) {
          that.msg = response.data.result;
        }
      })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.view1 {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: space-around;
}
.view1 > li {
  width: 200px;
  height: 200px;
  background-color: rgba(54, 194, 35, 0.1);
  list-style: none;
  margin: 50px;
  position: relative;
}
.view1 > li > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.view2 {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: space-around;
}
.view2 > li {
  width: 200px;
  height: 200px;
  background-color: rgba(54, 194, 35, 0.1);
  list-style: none;
  margin: 50px;
  position: relative;
}
.view2 > li > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.delect {
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  font-size: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  user-select: none;
  cursor: pointer;
  opacity: 0;
}
.delect:hover {
  background-color: rgba(31, 31, 31, 0.5);
  color: white;
}
.view > li:hover .delect {
  opacity: 1;
}
.upload1 {
  width: 120px;
  height: 40px;
  background-color: rgb(247, 238, 238);
  border: 1px;
  border-radius: 5px;
  position: relative;
  margin-left: 15%;
  margin-top: 5%;
}
.upload1:hover {
  background-color: rgba(135, 206, 235, 1);
}
.upload1::before {
  position: relative;
  top: 6px;
  left: 4px;
  content: "上传图片(街景分类)";
  font-size: 13px;
  line-height: 20px;
  user-select: none;
}
.upload2 {
  width: 135px;
  height: 40px;
  background-color: rgb(247, 238, 238);
  border: 1px;
  border-radius: 5px;
  position: absolute;
  margin-left: 65%;
  margin-top: -40px;
}
.upload2:hover {
  background-color: rgba(135, 206, 235, 1);
}
.upload2::before {
  position: relative;
  top: 6px;
  left: 4px;
  content: "上传图片(交互式标注)";
  font-size: 13px;
  text-align: center;
  line-height: 20px;
  user-select: none;
}
#file {
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
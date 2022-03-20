<template>
  <div class="page">
    <!-- 导航栏 -->
  <header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" 
    background-color=transparent text-color="#fff" active-text-color="#ffd04b">

    <el-menu-item index="1" class="font1"><a href="#introduction">项目简介</a></el-menu-item>
    <el-submenu index="2" class="font1">
      <template slot="title">功能介绍</template>
      <el-menu-item index="2-1"><a href="#detail">建筑物检测</a></el-menu-item>
      <el-menu-item index="2-2">建筑物提取</el-menu-item>
      <el-menu-item index="2-3">建筑物分类</el-menu-item>
      <el-menu-item index="2-4">交互式标注</el-menu-item>
    </el-submenu>
    <el-menu-item index="3" class="font1"><a href="#footer" >联系我们</a></el-menu-item>
    <el-menu-item index="4" class="font2"><a href="">登录</a></el-menu-item>
    <el-menu-item index="5" class="font2"><a href="">注册</a></el-menu-item>
    </el-menu>
  </header>

  <!-- 开头图片 -->
  <div class="second">
    <img class="bgimg" src="@/assets/img/bgimg.png">
    <div class="transparent">
      <span class="word"><br>为地理信息和空间科技产业赋予更加敏锐的“洞察力”<br>以更宏观、更全面地跟进人类活动或自然变化对地表的影响<br>为城市建设、生态监测提供可靠依据</span>
      <br>
      <el-row>
        <el-button  icon="el-icon-right">开始了解</el-button>
      </el-row>
    </div>
  </div>

<!-- 轮播图 -->
<h1 id="introduction">
  <el-carousel :interval="4000" type="card" height="360px" class="change">
    <el-carousel-item v-for="(item,index) in list_img" :key="index">
        <img :src="item.url" alt />
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  </h1>
  <div class="demo demo-flex">
<span class="word1">图像数据标注是指将图像数据中各个感兴趣的部分指定为各种类型的工作。<br>目前遥感卫星图像标注是图像标注工作中的一个重要组成部分<br>由于卫星拍摄的遥
感图像在城市中的元素大都是一些建筑物的房顶、绿地和湖泊等<br>其中的房屋元素具有重要的研究价值<br>从而使遥感卫星图像的房屋部分成为了这些工作中的主
角<br>本系统对遥感图像进行标注的任务即标注出图像中的房屋。</span>
</div>

<!-- 功能部分 -->
<h2 id="detail">
  <div>
    
  </div>
    <div class="demo-image__placeholder">
      <div class="block">
          <el-image class="block" :src="require('@/assets/img/img5.jpg')" />
          <el-image class="block" :src="require('@/assets/img/img7.jpg')" />
          <el-image class="block" :src="require('@/assets/img/img4.gif')" @click="remote">
          </el-image>
      </div>
      </div>
</h2>

<!-- footer -->
  <h4 id="footer">
    <div class="gcs-footer">
      <div class="footer-top">
        <a href="#">项目简介</a> |
        <a href="#">功能介绍</a> |
        <a href="#">联系我们</a> |
        <a href="#">登录</a> |
        <a href="#">注册</a> 
      </div> 
      <p>
        ©Copyright 2022 中国地质大学（武汉）版权所有 | 湖北省ICP备1243xxxx号-4
      </p>
    </div>
  </h4>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      list_img: [{url: require('@/assets/img/img1.png')},
                {url: require('@/assets/img/img4.gif')},
                {url: require('@/assets/img/img5.jpg')},
                {url: require('@/assets/img/img6.jpg')}
                ],
                activeIndex: '1'
        };
        },
  methods: {
      remote:function() {
        this.$router.push('/functions');
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page{
  padding:0;
  margin:0;
}
.font1{
  position: relative;
  left:10%
}
.font2{
  position: relative;
  left:60%
}
.el-menu-demo{
  background-color:transparent;
}
.transparent{
  position: absolute;
    background: rgb(82, 83, 85);
    /*透明度*/
    opacity: 0.8;
    /*字体居中*/
    text-align: center;
    /*div标签上移*/
    top: -0.1px;
    height: 90%;
    width:100%;
    z-index: -1;
}
.word{
  line-height: 2.8;
  letter-spacing: 3px;
  color:white;
  margin-top:130px;
}
.word1{
  line-height: 2.8;
  letter-spacing: 3px;
  color:rgb(26, 24, 24);

}
.bgimg{
  position:absolute;
  padding: 0;
  top:-70px;
  z-index: -100;
  height: 100%;
  width: 100%;
}
span{
  display:block;
  text-align:center;
  padding:13px;
  font-size:17px;
}
.change{
  position: relative;
  margin-top:500px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
a{
  color: white;
  text-decoration:none;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
  
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.demo-image__placeholder .block {
  padding: 0px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  margin-left: 2%;
}
.demo-image__placeholder .el-image {
  float: left;
  position: relative;
  padding: 0 5px;
  max-width: 30%;
  height: 30%;
  border-radius:17px;
}
.demo-image__placeholder .el-image:hover {
  filter:alpha(Opacity=80);
  -moz-opacity:0.8;
  opacity: 0.8
}
.gcs-footer{
  position: absolute;
  margin: 0px;
  padding:0px;
  margin-top: 20px;
  background:#222c3a;
  width: 100%;
  height: 165px;
  text-align: center;
  color: white;
}
.gcs-footer .footer-top{
  
  margin-top: 50px;
}
.gcs-footer a{
  color: #f0f1f1;
  text-decoration: none;
  padding: 0 10px;
  vertical-align:middle;
}
.gcs-footer a:hover{
  font-size: 17px;
  text-decoration: underline;
}
.gcs-footer p{
  height: 15px;
  color: #888888;
  top: 30px;
}
</style>
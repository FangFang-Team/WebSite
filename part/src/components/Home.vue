<template>
  <div>
  <el-carousel :interval="4000" type="card" height="375px">
    <el-carousel-item v-for="(item,index) in list_img" :key="index">
        <img :src="item.url" alt />
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  <div class="demo demo-flex">
<span>图像数据标注是指将图像数据中各个感兴趣的部分指定为各种类型的工作。<br>目前遥感卫星图像标注是图像标注工作中的一个重要组成部分<br>由于卫星拍摄的遥
感图像在城市中的元素大都是一些建筑物的房顶、绿地和湖泊等<br>其中的房屋元素具有重要的研究价值<br>从而使遥感卫星图像的房屋部分成为了这些工作中的主
角<br>本系统对遥感图像进行标注的任务即标注出图像中的房屋。</span>
</div>
    <div class="demo-image__placeholder">
    <div class="block">
      <el-image :src="require('@/assets/img/img1.png')" />
    </div>
    <div class="block">
      <el-image :src="require('@/assets/img/img2.jpeg')" >
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
      </el-image>
      <div class="block">
      <el-image :src="require('@/assets/img/img3.jpeg')" @click="remote"/>
      </div>
    </div>
  </div>
 

  </div>
</template>
 
<script>
export default {
  name: 'Home',
  data(){
    return {
      list_img: [{url: require('@/assets/img/img1.png')},
                {url: require('@/assets/img/img1.png')},
                {url: require('@/assets/img/img1.png')},
                {url: require('@/assets/img/img1.png')},
                {url: require('@/assets/img/img1.png')}
                ],
            };
        },
  methods: {
      remote:function() {
        this.$router.push('/functions');
      }
    }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span{
  display:block;
  text-align:center;
  padding:13px;
  font-size:17px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
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
}
.demo-image__placeholder .el-image {
  padding: 0 5px;
  max-width: 400px;
  height: 560px;
  border-radius:17px;
}
.demo-image__placeholder.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
.demo-image__placeholder .dot {
  animation: dot 2s infinite steps(3, start);
  overflow: hidden;
}
.demo-image__placeholder .el-image:hover {
  filter:alpha(Opacity=80);
  -moz-opacity:0.8;
  opacity: 0.8
}
</style>
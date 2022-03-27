<template>
    <div>
      <img :src="img" class="main_pic" alt="">
    </div>
</template>
<script>
export default {
  name: 'street_v_c',
  data() { 
    return{
      img:'',
      result:''
    } 
},
created() {
    this.getRouterData();
  },
methods:{
  getRouterData() {
      this.img = this.$route.params.img;
      this.result = this.$route.params.result;
      console.log("img", this.img);
      console.log("result",this.result);
    }
}
}
</script>
<style scoped>

</style>
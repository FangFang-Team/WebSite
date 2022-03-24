<template>
  <div>
    <img :src="img" class="main_pic" alt="">
  </div>
</template>
<script>
export default {
    name:"inter_ann",
  data() {
    return {
      img:''
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
  },
};
</script>
<style>
.main_pic{
 position: relative;
  margin-left: 58%;
}
</style>
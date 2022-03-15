<template>
  <div class="button">
   
    <el-button type="text">街景数据</el-button>
    <el-button type="text">街景数据</el-button>
    <el-button type="text" @click="remote">遥感数据</el-button>
  </div>
</template>
 
<script>
export default {
  name: 'Home',
  methods: {
      remote:function() {
        this.$router.push('Function')
      }
    }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  font-size: 20px;
  margin: auto;
}
</style>
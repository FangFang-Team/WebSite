<template>
  <div>
    <el-button type="text">遥感数据</el-button>
  </div>
</template>
 
<script>
export default {
  name: 'Function',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value2: new Date(2016, 9, 10, 18, 40),
      value3: new Date(2016, 9, 10, 18, 40)
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
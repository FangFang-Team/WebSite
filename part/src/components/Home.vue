<template>
  <div class="button">
    <el-button type="text" @click="remote">遥感数据</el-button>
    <el-button type="text">街景数据</el-button>
    <el-button type="text">街景数据</el-button>
  </div>
</template>
 
<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value2: new Date(2016, 9, 10, 18, 40),
      value3: new Date(2016, 9, 10, 18, 40)
    }
  },
  methods: {
      remote() {
        this.$router.replace('/function')
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
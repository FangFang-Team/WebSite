<template>
  <div id="app">
    <el-button type="text">街景数据</el-button>
    <el-button type="text">街景数据</el-button>
    <router-link to='/Function'><el-button type="text">遥感数据</el-button></router-link>
  </div>
</template>

<script>
import Home from './components/Home'
import Function from './components/Function'
export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style>

</style>
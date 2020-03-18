<template>
  <div id="app">
    <Navbar />
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue';
export default{
  components: {
    Navbar
  }
}


</script>

<style lang="scss">
* {padding: 0;margin: 0;box-sizing: border-box;}
body{
  padding-top: 80px !important;
  background: #eee !important;
}
</style>

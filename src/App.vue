<template>
  <div id="app">
    <Navbar />
    <router-view/>
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
</style>

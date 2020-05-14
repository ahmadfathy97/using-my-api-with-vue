<template>
  <div id="app">
    <Navbar :key="$route.path + Math.random()"/>
    <router-view :key="$route.path"/>
    <!-- important adding key attribute force Vue to create a new instance of the component. -->
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
  background: #f6f6f6 !important;
}
.btn{
  cursor: pointer !important
}
.post img{
  width: 100% !important
}
.post ul li{
  margin: 2px 20px 2px 20px;
  list-style-type: disc !important;
}
.post ol li{
  margin: 2px 20px 2px 20px;
  list-style-type: decimal !important;
}
.post .comments li{
  margin: 5px;
  list-style-type: none !important;
}

.post pre{
  background: #222;
  color: #f9f9f9;
}
</style>

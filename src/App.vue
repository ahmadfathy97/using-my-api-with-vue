<template>
  <div id="app">
    <Navbar :key="$route.path + Math.random()"/>
    <div class="w-75 mx-auto text-center alert alert-danger">
      I am working on the UI
    </div>
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
*::-webkit-scrollbar {
  width: 1em;
}
*::-webkit-scrollbar-track {
  border: 1px solid #333;
  border-radius: 5px;
}
*::-webkit-scrollbar-thumb {
  background-color: #333;
  border-radius: 5px;

}
.btn{
  cursor: pointer !important
}
.post img:not(.user-img){
  display: block;
  margin: auto;
  box-shadow: 0 0 5px #0081ff;
  border-radius: 10px;
  max-width: 100%;
}
.user-img{
  background-color: #666;
  width: 45px;
  height: 45px;
  overflow: hidden;
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

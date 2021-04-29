<template>
  <div id="app">
    <Navbar :key="$route.path + Math.random()"/>
    <div class="m-1 p-1 w-75 mx-auto text-center alert alert-danger">
      I am working on the UI.
    </div>
    <div class="m-1 p-1 w-75 mx-auto text-center alert alert-danger">
      Sorry, the image will be deleted after 30 mins from uploading.
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
* {padding: 0;margin: 0;box-sizing: border-box;word-break: break-all;}
body{
  padding-top: 80px !important;
  background: #eee !important;
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
.page-title{
  padding: .25rem auto;
  display: inline-block;
  position: relative;
  // text-decoration: underline wavy #0080ff 3px;
  color: #222;
  margin-bottom: 15px;
}
.page-title:after, .page-title:before{
  position: absolute;
  content: '';
  left: 0;
  bottom: -4px;
  height: 4px;
  width: 80%;
  border-radius: 8px;
  background: #0080ff;
}
.page-title:after{
  width: 60%;
  bottom: -10px;
  background: #222;
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
  direction: ltr !important;
  text-align: left !important;
}
</style>

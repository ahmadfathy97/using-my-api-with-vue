<template>
  <div id="nav">
    <router-link to="/" exec>Home</router-link>
    <template v-if="logedIn">
      <router-link :to="'/user/'+user_id" exec>profile</router-link>
      <router-link to="/addpost" exec>Add Post</router-link>
      <router-link to="/categories" exec>categories</router-link>
      <router-link to="/logout" exec>logout</router-link>
    </template>
    <template  v-if="!logedIn">
      <router-link to="/login" exec>login</router-link>
      <router-link to="/signup" exec>signup</router-link>
    </template>
  </div>
</template>
<script>
export default{
  data(){
    return{
      logedIn: false,
      user_id: ''
    }
  },
  mounted(){
    if(window.localStorage && window.localStorage.getItem('authToken')){
      this.logedIn = true;
      this.user_id = window.localStorage.user_id;
    } else{
    this.logedIn = false
    }
  }
}
</script>
<style >
  a{
    display: inline-block;
    margin: 10px;
  }
</style>

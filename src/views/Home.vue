<template>
  <div class="posts">
    <div class="container">

      <div class="row">

        <div v-if="logedIn" class="col-md-12">
          <h1>Latest Posts</h1>
        </div>

        <div v-if="!logedIn" class="col-md-12">
          <div class="alert-info text-center">
            <router-link to="/login">login</router-link> or <router-link to="/signup">sign up</router-link>
          </div>
        </div>

        <div v-if="logedIn" class="col-md-12">
          <allPosts />
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import allPosts from '../components/allPosts.vue';
export default{
  data(){
    return{
      logedIn: false
    }
  },
  components: {
    allPosts
  },
  mounted(){
    if( window.localStorage.getItem('authToken')){
      this.logedIn = true;
    }
  }
}
</script>
<style >
body{
  background: #f6f6f6;
  padding: 10px;
  min-height: 100vh;
}
</style>

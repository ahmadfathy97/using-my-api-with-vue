<template>
  <div class="posts">
    <div class="container">

      <div class="row">

        <div v-if="logedIn" class="col-md-12">
          <h1>Latest Posts</h1>
        </div>

        <div v-if="!logedIn" class="not-loged-in col-md-12 d-flex align-items-center justify-content-center flex-column">
          <div class="alert-info text-center rounded p-3 shadow h3">
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
    if(this.$route.query.resetpassword){
      this.$router.history.push(`/reset-password/${this.$route.query.hash}`)
    }
    if( window.localStorage.getItem('authToken')){
      this.logedIn = true;
    }
  }
}
</script>
<style scoped>
.not-loged-in{
  min-height: 80vh
}
</style>

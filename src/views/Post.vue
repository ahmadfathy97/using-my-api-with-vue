<template>
<div class="container">
  <div class="row">

    <div v-if="!logedIn" class="col-md-12">
      <div class="alert-info text-center">
        <router-link to="/login">login</router-link> or <router-link to="/signup">sign up</router-link>
      </div>
    </div>

    <div v-if="logedIn" class="col-md-12">
      <onePost :post_id="this.$route.params.id"/>
    </div>

  </div>
</div>
</template>
<script>
import onePost from '../components/onePost.vue';
export default{
  data(){
    return{
      logedIn: false
    }
  },
  components: {
    onePost
  },
  mounted(){
    if( window.localStorage.getItem('authToken')){
      this.logedIn = true;
    } else{
      window.location.href = 'http://' + window.location.host + '/login'
    }
  }
}
</script>
<style >

</style>

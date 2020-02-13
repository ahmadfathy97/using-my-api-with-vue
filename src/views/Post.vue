<template>
<div class="container">
  <div class="row">

    <div v-if="!logedIn" class="col-md-12">
      <div class="alert-info text-center">
        <a href="/login">login</a> or <a href="/signup">sign up</a>
      </div>
    </div>

    <div v-if="logedIn" class="col-md-12">
      <onePost :post_id="$route.params.id"/>
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
    }
  }
}
</script>
<style >

</style>

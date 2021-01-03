<template>
<div class="container">
  <div class="row">

    <div v-if="!logedIn" class="col-md-12">
      <div class="alert-info text-center">
        <router-link to="/login">login</router-link> or <router-link to="/signup">sign up</router-link>
      </div>
    </div>

    <div v-if="logedIn" class="col-md-12">
      <onePost :post="post"/>
    </div>

  </div>
</div>
</template>
<script>
import onePost from '../components/onePost.vue';
import { mapGetters } from 'vuex';

export default{
  data(){
    return{
      logedIn: true,
      post: {},
      user_id: ''
    }
  },
  computed: mapGetters(["api"]),
  components: {
    onePost
  },
  mounted(){

    this.user_id = window.localStorage.getItem('user_id');
    let id = this.$route.params.id || '';
    fetch(`${this.api}/posts/${id}`,{
      headers: {
        'Content-Type': 'application/json',
        'auth_token': window.localStorage.getItem('authToken') || null
      },
    })
    .then(res => res.json())
    .then(post => {
      this.post = post;
      console.table(post);
    })
  },
}
</script>
<style >

</style>

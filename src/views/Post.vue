<template>
<div class="container">
  <div class="row">
    <Loading v-if="!post._id" />
    <div v-if="post._id" class="col-md-12">
      <onePost :post="post" :key="post._id"/>
    </div>
  </div>
</div>
</template>
<script>
import onePost from '../components/onePost.vue';
import Loading from '../components/Loading.vue';

import { mapGetters } from 'vuex';

export default{
  data(){
    return{
      post: {},
      user_id: ''
    }
  },
  computed: mapGetters(["api"]),
  components: {
    onePost,
    Loading
  },
  mounted(){
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

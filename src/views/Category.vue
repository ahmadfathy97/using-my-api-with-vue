<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <img :src="category.category_pic" width="100%" >
        <h3 class="text-primary bold my-3"># {{ category.category_name}}</h3>
        <p>{{category.category_info}}</p>
      </div>
      <div class="col-md-12">
        <PostTitle v-for="post in posts" :post="post" :key="post._id"/>
      </div>
    </div>
  </div>
</template>

<script>
import PostTitle from '../components/PostTitle.vue';

import { mapGetters } from 'vuex';

export default{
  data(){
    return {
      category: {},
      posts: [],
      comment:{
        user_id: window.localStorage.user_id,
        comment_body: '',
        comment_time: ''
      }
    }
  },
  components: {
    PostTitle
  },
  computed: mapGetters(["api"]),
  mounted(){
    this.user_id = window.localStorage.getItem('user_id');
    let name = this.$route.params.name;
    fetch(`${this.api}/categories/${name}` ,{
      headers: {
        'Content-Type': 'application/json',
        'auth_token': window.localStorage.getItem('authToken') || null
      }
    })
    .then(res=> res.json())
    .then((data)=>{
      this.category = data.category;
      this.posts = data.posts;
    })
    .catch(err => console.log(err));
  }
}
</script>


<style>

</style>

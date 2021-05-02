<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <img :src="category.category_pic" width="100%" >
        <h3 class="text-primary bold my-3 page-title py-1">{{ category.category_name | capitalize}}</h3>
        <p>{{category.category_info}}</p>
      </div>
      <div v-if="posts.length" class="col-md-12">
        <PostTitle v-for="post in posts" :post="post" :key="post._id"/>
      </div>
      <div v-if="!posts.length && loaded" class="col-md-12">
        <div class="alert alert-info">
          there is no posts in this category.
        </div>
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
      loaded: false,
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
  filters:{
    capitalize(value){
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
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
      this.loaded = true;
    })
    .catch(err => console.log(err));
  }
}
</script>


<style>

</style>

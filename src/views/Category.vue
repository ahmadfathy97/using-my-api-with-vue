<template>
  <div class="container">
    <div v-if="logedIn" class="row">
      <div class="col-md-12">
        <img :src="category.category_pic" width="100%" >
        <h5>{{ category.category_name}}</h5>
        <p>{{category.category_info}}</p>
      </div>
      <div class="col-md-12">
        <allPosts :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script>
import allPosts from '../components/allPosts.vue';
import { mapGetters } from 'vuex';

export default{
  data(){
    return {
      logedIn: true,
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
    allPosts
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

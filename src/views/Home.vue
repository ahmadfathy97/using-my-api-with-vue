<template>
  <div class="home">
    <div class="container">

      <div class="row">
        <div v-if="!logedIn" class="not-loged-in col-md-12 d-flex align-items-center justify-content-center flex-column">
          <div class="alert-info text-center rounded p-3 shadow h3">
            <router-link to="/login">login</router-link> or <router-link to="/signup">sign up</router-link>
          </div>
        </div>

        <div v-if="logedIn" class="col-md-12">
          <h1 class="page-title">Latest Posts</h1>
        </div>

        <div v-if="logedIn" class="col-md-12">
          <Loading v-if="!posts.length" />
          <onePost v-for="post in posts" :post="post" :key="Math.random()" @deletingPost="deletePost"/>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
// import allPosts from '../components/allPosts.vue';
import onePost from '../components/onePost.vue';
import Loading from '../components/Loading.vue';


export default{
  data(){
    return{
      logedIn: false,
      posts: []
    }
  },
  computed: mapGetters(["api"]),
  components: {
    onePost,
    Loading
  },
  mounted(){
    if(this.$route.query.resetpassword){
      this.$router.history.push(`/reset-password/${this.$route.query.hash}`)
    }
    if( window.localStorage.getItem('authToken')){
      this.logedIn = true;
      fetch(`${this.api}/posts/latest`,{
        headers: {
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        },
      })
      .then(res => res.json())
      .then(posts => {
        this.posts = posts;
        console.table(posts);
      })
      .catch( err =>{
        console.log(err);
      })
    }
  },
  methods:{
    deletePost(id){
      console.log('id => ', id);
      this.posts = this.posts.filter(post=> post._id !== id)
    }
  }
}
</script>
<style scoped>
.not-loged-in{
  min-height: 80vh
}
</style>

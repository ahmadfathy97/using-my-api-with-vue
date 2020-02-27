<template>
  <div class="profile">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex flex-column justify-content-center align-items-center" width="100%">
            <img :src="user.pic" width="300" height="300" alt="">
            <h1>{{user.username}}</h1>
            <p>{{user.info}}</p>
            <h5>{{user.followers.length}} followers</h5>
            <h5>{{user.following.length}} following</h5>

            <div v-if="this.$route.params.id != user_id">
              <span v-if="!user.followers.indexOf(user_id)" class="btn btn-danger" @click="follow()">unfollow</span>
              <span v-if="user.followers.indexOf(user_id)" class="btn btn-primary" @click="follow()">follow</span>
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <p v-if="!posts.length">there is no posts</p>
          <template v-if="posts.length">
            <h2>posts</h2>
            <div class="post" v-for="post in posts">
              <a :href="'/posts/'+post._id">
                <h3>{{post.title}}</h3>
              </a>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { mapGetters } from 'vuex';

export default{
  data(){
    return{
      user: {},
      posts: [],
      user_id: window.localStorage.getItem('user_id')
    }
  },
  computed: mapGetters(["api"]),
  mounted(){
    if(window.localStorage.getItem('authToken')){
      let id = this.$route.params.id;
      fetch(`${this.api}/users/${id}`, {
        headers:{
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken')
        }
      })
      .then(res => res.json())
      .then((data)=>{
        this.user = data
      })
      .catch((err)=>{
        console.log(err);
      })
      fetch(`${this.api}/posts/user/${id}` ,{
        headers:{
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken')
        }
      })
      .then(res => res.json())
      .then((data)=>{
        this.posts = data
      })
      .catch((err)=>{
        console.log(err);
      })
    }else{
      window.location.href = 'http://' + window.location.host + '/login'
    }
  },
  methods:{
    follow(){
      fetch(`${this.api}/users/${this.$route.params.id}/follow`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken')
        }
      })
      .then(res => res.json())
      .then((data)=>{
        this.user.followers = data.followers
      })
    }
  }

}
</script>


<style >

</style>

<template>
  <div id="nav">
    <router-link to="/" exec>Home</router-link>
    <template v-if="logedIn">
      <router-link :to="'/user/'+user_id" exec>Profile</router-link>
      <router-link to="/addpost" exec>Add Post</router-link>
      <router-link to="/categories" exec>Categories</router-link>
      <router-link to="/notifications" exec>Notifications<span class="badge text-danger" v-if="notisNum > 0">{{notisNum || 0}}</span></router-link>

      <router-link to="/logout" exec>logout</router-link>
    </template>
    <template  v-if="!logedIn">
      <router-link to="/login" exec>login</router-link>
      <router-link to="/signup" exec>signup</router-link>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default{
  data(){
    return{
      logedIn: false,
      user_id: '',
      notisNum: 0
    }
  },
  computed: mapGetters(["api"]),
  mounted(){
    if(window.localStorage && window.localStorage.getItem('authToken')){
      this.logedIn = true;
      this.user_id = window.localStorage.user_id;
      setInterval(() => {
        fetch(`http://127.0.0.1:3000/api/users/notifications`,{
          method: 'GET',
          headers: {
            'Content-Type':'application/josn',
            'auth_token': window.localStorage.getItem('authToken') || null
          }
        })
        .then(res => res.json())
        .then((data)=>{
          let unreaded = data.notis.filter((noti)=>{
            return noti.readed === false;
          });
          this.notisNum = unreaded.length;
          console.log(this.notisNum, unreaded.length);
        })
        .catch((err)=>{
          console.log(err);
        })
      }, 10000)
    } else{
    this.logedIn = false
    }
  }
}
</script>
<style >
  a{
    display: inline-block;
    margin: 10px;
  }
</style>

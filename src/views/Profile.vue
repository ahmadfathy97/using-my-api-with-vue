<template>
  <div class="profile">
    <div v-if="!err">
      <div style="margin-bottom: 5rem" class="col-md-12 bg-light header-container position-relative">
        <img :src="user.pic" class="user-pic position-absolute rounded-circle shadow" alt="">
      </div>
      <div class="container mt-5">
        <div class="row pt-5">
          <div v-if="this.$route.params.id != user_id" class="col-md-12 d-flex justify-content-center">
            <span v-if="user.followers ? (user.followers.indexOf(user_id) >= 0 ? true : false) : false" class="btn btn-danger" @click="follow()">unfollow</span>
            <span v-if="user.followers ? (user.followers.indexOf(user_id) < 0 ? true : false): false" class="btn btn-primary" @click="follow()">follow</span>
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <h1>{{user.username}}</h1>
            <p class="h6">
              Birthday: {{user.dayOfBirth}}
            </p>
          </div>
          <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <span class="m-1 p-2 bold">Followers: {{user.followers ? user.followers.length : 0}} </span>
            <span class="m-1 p-2 bold">Following: {{user.following ? user.following.length : 0}} </span>
          </div>
          <div class="col-md-12">
            <p class="m-1 h5">{{user.info}}</p>
          </div>
          <div class="col-md-12 d-flex justify-content-center">
            <button v-if="user_id === $route.params.id" class="btn btn-secondary my-2" @click="closed = false">Edit</button>
          </div>
        </div>

        <!-- posts -->
        <div class="row my-5">
          <div class="col-md-12">
            <p v-if="!posts.length && !postsErr" class="alert alert-info">there is no posts</p>
            <p class="alert alert-danger" v-if="postsErr">{{postsErr}}</p>
            <template v-if="posts.length">
              <h2 class="py-1 page-title">posts</h2>
              <PostTitle v-for="post in posts" :post="post" :key="post._id" />
            </template>
          </div>
        </div>
      </div>
    </div>

    <div v-if="err">
      <div class="alert alert-danger">
        {{err}}
      </div>
    </div>

    <div v-if="!closed" class="fixed-top d-flex align-items-center justify-content-center editPopUp p-2 shadow m-0">
      <div class="form-container bg-light p-5 m-2 rounded">
        <button @click="closed = true" class="position-fixed close-btn btn btn-danger shadow border border-dark border-left border-bottom">
          X
        </button>
        <div class="form-group">
          <label>username</label>
          <input type="text" class="form-control" name="username" v-model="username">
        </div>
        <div class="form-group">
          <label>day of birth</label>
          <input type="date" class="form-control" name="dayOfBirth" v-model="dayOfBirth">
        </div>
        <div class="form-group">
          <label>info</label>
          <textarea type="text" class="form-control" name="ifno" v-model="info"></textarea>
        </div>
        <div class="form-group">
          <label>image</label>
          <input class="form-control" type="file" accept="image/*" ref="pic" required name="pic" @change="handleUploadFile()" />
        </div>
        <div class="form-group">
          <input type="submit" class="btn btn-primary" value="edit" info @click="editInfo()">
        </div>
        <!-- <div class="alert alert-info" v-f="msg">
          {{msg}}
        </div> -->

        <div class="border border-primary shadow my-4"></div>


        <div class="form-group">
          <label>old password</label>
          <input type="password" class="form-control" name="oldPassword" value="" v-model="oldPassword">
        </div>
        <div class="form-group">
          <label>new password</label>
          <input type="password" class="form-control" name="password" value="" v-model="password">
        </div>
        <div class="form-group">
          <input type="submit" class="btn btn-primary" value="edit passsword" @click="editPass()">
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { mapGetters } from 'vuex';
import PostTitle from '../components/PostTitle';
export default{
  data(){
    return{
      user: {},
      posts: [],
      user_id: window.localStorage.getItem('user_id'),
      closed: true,
      username: '',
      info: '',
      dayOfBirth: '',
      oldPassword: '',
      password: '',
      pic: '',
      err: '',
      postsErr: ''
    }
  },
  components:{
    PostTitle
  },
  computed: mapGetters(["api"]),
  mounted(){
    let id = this.$route.params.id;

    // fetching user data
    fetch(`${this.api}/users/${id}`, {
      headers:{
        'Content-Type': 'application/json',
        'auth_token': window.localStorage.getItem('authToken')
      }
    })
    .then(res => res.json())
    .then((data)=>{
      console.log(data);
      if(data && data.success){
        this.user = data.user;
        this.username = data.user.username
        this.info = data.user.info
        this.dayOfBirth = data.user.dayOfBirth
      } else{
        this.err = data.msg || 'somthing went wrong'
      }
    })
    .catch((err)=>{
      console.log(err);
      this.err = 'something went wrong'
    })

    // fetching posts
    fetch(`${this.api}/posts/user/${id}` ,{
      headers:{
        'Content-Type': 'application/json',
        'auth_token': window.localStorage.getItem('authToken')
      }
    })
    .then(res => res.json())
    .then((data) =>{
      console.log(data);
      if(data && data.success){
        this.posts = data.posts
      } else{
        this.postsErr = data.msg || 'somthing went wrong'
      }
    })
    .catch((err)=>{
      this.postsErr = 'somthing went wrong'
    })
  },

  methods:{
    handleUploadFile(){
      this.pic = this.$refs.pic.files[0];
    },
    follow(){
      let date = new Date();
      let data = {time: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`};
      fetch(`${this.api}/users/${this.$route.params.id}/follow`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken')
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then((data)=>{
        this.user.followers = data.followers
      })
    },
    editInfo(){
      let formData = new FormData();
      formData.append('pic', this.pic);
      formData.append('username', this.username);
      formData.append('info', this.info);
      formData.append('dayOfBirth', this.dayOfBirth);
      for (var value of formData.values()) {
         console.log(value);
      }
      fetch(`${this.api}/users/${this.$route.params.id}`,{
        method: 'PUT',
        headers:{
          'Accept': 'application/josn',
          'auth_token': window.localStorage.getItem('authToken')
        },
        mimeType: 'multipart/form-data',
        body: formData
      })
      .then(res => res.json())
      .then((data)=>{
        console.log(data);
        this.user = data;
        this.closed = true
      })
      .catch((err)=>{
        console.log('err', err);
      })
    },
    editPass(){
      fetch(`${this.api}/users/${this.$route.params.id}/password`,{
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken')
        },
        body: JSON.stringify({
          oldPassword: this.oldPassword,
          password: this.password
        })
      })
      .then(res => res.json())
      .then((data)=>{
        console.log(data);
        alert(data.msg);
        if(data.msg === "password Updated"){
          this.closed = true;
        }
      })
      .catch((err)=>{
        console.log('err', err);
      })
    }
  }

}
</script>


<style scoped>
.header-container{
  margin-top: -20px;
  background-image: linear-gradient(189deg, #007bff, #010101);
  min-height: 300px;
  height: 50vh;
}
.user-pic{
  width: 250px;
  height: 250px;
  position: absolute;
  bottom: -50%;
  left: 50%;
  background: #aaa;
  overflow: hidden;
  object-fit: cover;
  border: 5px solid #eee;
  transform: translate(-50%, -40%);
}
.editPopUp{
  height: 100vh;
  z-index: 9999999999999 !important;
  background: rgba(0,0,0, .5)
}
.form-container{
  width: 100%;
  height: 95%;
  overflow-y: auto;
}
.close-btn {
  right: 10px;
  top: 10px;
}
</style>

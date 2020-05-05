<template>
  <div id="nav" class="text-ligth bg-dark">
    <template v-if="logedIn">
      <div class="big-screen">
        <router-link to="/" exec>Home</router-link>
        <a :href="'/user/'+user_id">Profile</a>
        <router-link to="/addpost" exec>Add Post</router-link>
        <router-link to="/categories" exec>Categories</router-link>
        <router-link to="/notifications" exec>Notifications<span class="badge badge-danger" v-if="notisNum > 0">{{notisNum || 0}}</span></router-link>
        <div class="d-inline-flex align-items-center">
          <input v-model="name" class="searchBox" @keyup="enterKey($event)" />
          <a class="btn btn-light p-1 text-dark" :href="'/search-result/' + name" exec>Search</a>
        </div>
        <router-link class="float-right btn btn-danger" to="/logout" exec>logout</router-link>
      </div>
      <div class="small-screen">
        <router-link to="/" exec>
          <svg class="bi bi-house" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M9.646 3.146a.5.5 0 01.708 0l6 6a.5.5 0 01.146.354v7a.5.5 0 01-.5.5h-4.5a.5.5 0 01-.5-.5v-4H9v4a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-7a.5.5 0 01.146-.354l6-6zM4.5 9.707V16H8v-4a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v4h3.5V9.707l-5.5-5.5-5.5 5.5z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M15 4.5V8l-2-2V4.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5z" clip-rule="evenodd"/>
          </svg>
        </router-link>
        <a :href="'/user/'+user_id" exec>
          <svg class="bi bi-person" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M15 16s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002zM5.022 15h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C13.516 12.68 12.289 12 10 12c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002zM10 9a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/>
          </svg>
        </a>
        <router-link to="/addpost" exec>
          <svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M13.293 3.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM14 4l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M14.146 8.354l-2.5-2.5.708-.708 2.5 2.5-.708.708zM5 12v.5a.5.5 0 00.5.5H6v.5a.5.5 0 00.5.5H7v.5a.5.5 0 00.5.5H8v-1.5a.5.5 0 00-.5-.5H7v-.5a.5.5 0 00-.5-.5H5z" clip-rule="evenodd"/>
          </svg>
        </router-link>
        <router-link to="/categories" exec>
          <svg class="bi bi-table" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 3H4a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M17 6H3V5h14v1z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M7 17.5v-14h1v14H7zm5 0v-14h1v14h-1z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M17 10H3V9h14v1zm0 4H3v-1h14v1z" clip-rule="evenodd"/>
            <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v2H2V4z"/>
          </svg>
        </router-link>
        <router-link to="/notifications" exec>
          <svg class="bi bi-bell" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 18a2 2 0 002-2H8a2 2 0 002 2z"/>
            <path fill-rule="evenodd" d="M10 3.918l-.797.161A4.002 4.002 0 006 8c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C14.134 10.197 14 8.628 14 8a4.002 4.002 0 00-3.203-3.92L10 3.917zM16.22 14c.223.447.482.801.78 1H3c.299-.199.557-.553.78-1C4.68 12.2 5 8.88 5 8c0-2.42 1.72-4.44 4.005-4.901a1 1 0 111.99 0A5.002 5.002 0 0115 8c0 .88.32 4.2 1.22 6z" clip-rule="evenodd"/>
          </svg>
          <span class="badge badge-danger" v-if="notisNum > 0">{{notisNum || 0}}</span>
        </router-link>
        <div class="d-inline-flex align-items-center">
          <input v-model="name" class="searchBox" @keyup="enterKey($event)" />
          <a class="btn btn-light p-1 text-dark" :href="'/search-result/' + name" exec>
            <svg class="bi bi-search" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12.442 12.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M8.5 14a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM15 8.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clip-rule="evenodd"/>
            </svg>
          </a>
        </div>
        <router-link class="float-right btn btn-danger" to="/logout" exec>
          <svg class="bi bi-box-arrow-up-right" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M3.5 15A1.5 1.5 0 005 16.5h8a1.5 1.5 0 001.5-1.5v-4a.5.5 0 00-1 0v4a.5.5 0 01-.5.5H5a.5.5 0 01-.5-.5V7a.5.5 0 01.5-.5h4a.5.5 0 000-1H5A1.5 1.5 0 003.5 7v8zm7-11a.5.5 0 01.5-.5h5a.5.5 0 01.5.5v5a.5.5 0 01-1 0V4.5H11a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>
          <path fill-rule="evenodd" d="M16.354 3.646a.5.5 0 010 .708l-8 8a.5.5 0 01-.708-.708l8-8a.5.5 0 01.708 0z" clip-rule="evenodd"/>
        </svg>
        </router-link>
      </div>
    </template>
    <template  v-if="!logedIn">
      <router-link to="/" exec>Home</router-link>
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
      notisNum: 0,
      name: ''
    }
  },
  computed: mapGetters(["api"]),
  mounted(){
    if(window.localStorage && window.localStorage.getItem('authToken')){
      this.logedIn = true;
      this.user_id = window.localStorage.getItem('user_id');
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
  },
  methods:{
    enterKey(e){
      if(e.keyCode === 13){
        window.location.href = `http://${window.location.host}/search-result/${e.target.value}`;
      }
    }
  }
}
</script>
<style >
  #nav{
    position: fixed !important;
    top: 0;left:0;
    width: 100%;
    border-bottom: 4px solid #007bff;
    z-index: 9999999999999999999;
  }
  input.searchBox{
    padding: 3px;
    border-radius: 5px;
    border: 1px solid #fff;
  }
  a{
    display: inline-block;
    margin: 10px;
  }
  .router-link-exact-active{
    color: #fff;
    background-color: #007bff;
    display: inline-block;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  #nav a{
    text-decoration: none !important;
    color: #fff;
    padding: .25rem!important
  }
  .small-screen{
    display: none;
  }
  @media(max-width: 860px){
    .big-screen{
      display: none
    }
    .small-screen{
      display: block;
    }
    input.searchBox{
      width: 105px;
    }
    a{
      display: inline-block;
      margin: 5px;
    }
  }
</style>

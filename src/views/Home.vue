<template>
  <div class="home">
    <div class="container">

      <div v-if="!logedIn" style="perspective: 2000px;" class="row d-flex align-items-center py-3">
          <div class="col-md-6">
            <h1 class="page-title">Habshtakanat</h1>
            <p class="h4 m-0" style="text-indent: 20px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <div class="">
              <router-link class="btn btn-primary m-1" to="/signup">Sign Up</router-link>
              <span class="m-1">Or</span>
              <router-link class="btn btn-primary m-1" to="/login">Login</router-link>
            </div>
          </div>
          <section class="mooc-post col-md-6">
            <h2 class="animatedh "></h2>
            <div class="animatedv image"></div>
            <div class="animatedh line first"></div>
            <div class="animatedh line"></div>
            <div class="animatedh line short"></div><br/>
            <div class="animatedh line first"></div>
            <div class="animatedh line"></div>
            <div class="animatedh line short"></div>
            <h3 class="animatedh"></h3>
            <div class="list">
              <div class="animatedh item">
                <div class="circle"></div>
                <div class="text"></div>
              </div>
              <div class="animatedh item">
                <div class="circle"></div>
                <div class="text"></div>
              </div>
              <div class="animatedh item">
                <div class="circle"></div>
                <div class="text"></div>
              </div>
            </div>
            <div class="likes animatedh">
              <span class="btn animatedv"></span>
              <span class="num animatedh"></span>
            </div>
            <div class="comment animatedh">
              <div class="user">
                <div class="avatar animatedv"></div>
                <div class="info">
                  <div class="name animatedh"></div>
                  <div class="date animatedh"></div>
                </div>
              </div>
              <div class="text">
                <div class="line short animatedh comment-body"></div>
              </div>
            </div>
          </section>
      </div>

      <div v-if="logedIn" cclass="row">
        <div class="col-md-12">
          <h1 class="page-title">Latest Posts</h1>
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
<style scoped lang="scss">
.mooc-post{
  background: #fff;
  box-shadow: 0 4px 15px #222;
  margin: 50px auto;
  border-radius: 10px;
  transform: rotate3d(0, -4.5, 0, 50deg) rotateZ(1deg);
  perspective: 2000px;
  &:hover *:not(.list, .item, .likes, .user, .avatar, .name, .info , .date, .comment .text, .comment-body){
    box-shadow: 0 4px 8px #000;
  }
  &:hover *{
    transform: translateZ(180px) !important;
  }
  *{
    border-radius: 5px;
    margin: .5rem .25rem;
  }
  .animatedh, .animatedv{
    opacity: 0;
  }
  h2, h3{
    margin-top: .75rem;
    width: 60%;
    height: 22px;
    background: #0080ff;
  }
  h2{
    margin: .5rem auto;
  }
  .image{
    background-image: linear-gradient(45deg, #0080ff, #222);
    height: 120px;
  }
  .line{
    width: 95%;
    height: 12px;
    background: #aaa;
  }
  .line.short{
    width: 60%;
  }
  .line.first{
    width: 90%;
    margin-left: calc(5% + .25rem);
  }
  h3{
    height: 16px;
    width: 40%;
  }
  .list{
    .item{
      width: 80%;
      .circle{
        display: inline-block;
        width: 15px;
        height: 15px;
        boredr-radius: 50%;
        background: #888;
        margin: 0;
      }
      .text{
        margin: 0;
        display: inline-block;
        width: 220px;
        height: 8px;
        background: #aaa;
      }
    }
  }
  .likes{
    display: flex;
    justify-content: center;
    align-items: center;
    .num{
      width: 40px;
      height: 12px;
      background: #888
    }
    .btn{
      width: 20px;
      height: 20px;
      text-align: center;
      border-radius: 50%;
      background: #a81240
    }
  }
  .comment{
    background: #ccc;
    padding: .25rem;
    .user{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .avatar{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #444;
      }
      .info{
        .name{
          width: 80px;
          height: 10px;
          background: #0080ff;
        }
        .date{
          width: 60px;
          height: 6px;
          background: #888;
        }
      }
    }
    .text .line{
        margin-left: 2rem;
      }
  }
}
.not-loged-in{
  min-height: 80vh;
}
@for $i from 1 through 17 {
  .animatedh:nth-of-type(#{$i}){
    animation: scaleH .8s linear #{($i/3)}s forwards
  }
}
@for $i from 1 through 3 {
  .animatedv:nth-of-type(#{$i}){
    animation: scaleV 1s linear #{($i/5)}s forwards
  }
}
@keyframes scaleH{
  0%{
    transform-origin: left;
    opacity:0;
    transform: scaleX(0);
  }
  100%{
    transform-origin: left;
    transform: scaleX(1);
    opacity: 1;
  }
}
@keyframes scaleV{
  0%{
    transform-origin: top;
    transform: scaleY(0);
    opacity:0;
  }
  100%{
    transform-origin: top;
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>

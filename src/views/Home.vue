<template>
  <div class="posts">
    <div class="container">
      <div class="col-md-12">
        <h1>Home</h1>
      </div>
      <div class="col-md-12">
      </div>
      <div v-if="logedIn" class="posts">
        <div class="post" v-for="post in posts">
          <h2>{{post.title}}</h2>
          <h3 class="author">{{post.user_id.username}}</h3>
          <p>{{post.body}}</p>
          <!-- <h5>#{{post.category_id.category_name}}</h5> -->
          <h5 class="likes">{{post.likes.length > 1 ? post.likes.length + ' likes' : post.likes.length + ' like'}}</h5>
          <ul class="comments">
            <li v-for="comment in post.comments">
              <h3>{{comment.user_id.username}}</h3>
              <h4 class="comment-time">{{comment.comment_time}}</h4>
              <p class="comment-body">{{comment.comment_body}}</p>
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        logedIn: false,
        posts: []
      }
    },
    mounted(){
      if( window.localStorage.getItem('authToken')){
        this.logedIn = true;
        fetch('http://127.0.0.1:3000/api/posts',{
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
      }
    }
  }
</script>
<style >
  body{
    background: #f6f6f6;
    padding: 10px;
    min-height: 100vh;
  }
  .post{
    margin: 5px;
    padding: 10px;
    background: #eee
  }
  .author,.comment-time{
    font-size: 12px;
    font-weight: 200;
    font-style: italic;
  }
  li{
    list-style-type: none !important
  }
  p{
    margin: 5px;
    padding: 3px
  }
  .comments{
    padding-left: 10px;
  }
  .comments li{
    background: #ccc;
    padding: 5px
  }
  .comments li:nth-child(odd){
    background: #bbb;
  }
  .comment-body{
    margin: 10px auto
  }
  .likes{
    margin: 30px 10px 5px;
    color: #0080dd;
    font-size: 22px;
  }
</style>

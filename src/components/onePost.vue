<template>

  <div v-if="logedIn" class="posts">

    <div class="card post bg-light">
      <div class="card-body">
        <h3 class="card-title ">{{post.title}}</h3>
        <span class="card-title bold italic">by: <router-link :to="'/user/' + post.user_id._id">{{post.user_id.username}}</router-link></span>
        <span class="card-title italic">{{post.created_at}}</span>
        <div class="border shadow px-2 py-1" v-html="post.sanitizedHtml"></div>
        <div v-if="post.owner" class="owner">
          <router-link class="btn btn-info" :to="'/posts/edit/' + post._id">edit</router-link>
          <span class="btn btn-danger" @dblclick="deletePost($event)" :data-post="post._id" >delete</span>
        </div>
        <router-link :to="'/categories/' + post.category_id.category_name" class="btn btn-primary">#{{post.category_id.category_name}}</router-link>

        <h5 class="likes">
          <span v-if="post.likes.indexOf(user_id) >= 0" class="btn btn-danger" :data-post="post._id" @click="like($event)" role="button">unLike</span>
          <span v-if="post.likes.indexOf(user_id) < 0" class="btn btn-primary" :data-post="post._id" @click="like($event)" role="button">Like</span>

          <span>{{post.likes.length}}</span>
        </h5>
        <h2 v-if="post.comments.length > 0">comments</h2>
        <ul v-if="post.comments.length > 0" class="comments">
          <li v-for="comment in post.comments">
            <h3><router-link :to="'/user/'+comment.user_id._id">{{comment.user_id.username}}</router-link></h3>
            <h4 class="comment-time italic">{{comment.comment_time}}</h4>
            <p class="comment-body">{{comment.comment_body}}</p>
          </li>
        </ul>
        <div class="form-group">
          <textarea class="form-control"
                 type="text"
                 name="body"
                 :data-post="post._id"
                 @keyup="submitComment($event)">
          </textarea>
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
      logedIn: false,
      user_id: '',
      post: {},
      comment:{
        user_id: window.localStorage.user_id,
        comment_body: '',
        comment_time: ''
      }
    }
  },
  computed: mapGetters(["api"]),
  props:['post_id'],
  mounted(){
    if( window.localStorage.getItem('authToken')){
      this.logedIn = true;
      this.user_id = window.localStorage.getItem('user_id');
      let id = this.post_id || ''
      fetch(`${this.api}/posts/${id}`,{
        headers: {
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        },
      })
      .then(res => res.json())
      .then(post => {
        this.post = post;
        console.table(post);
      })
    }
  },
  methods:{
    submitComment(e){
      if(e.keyCode == 13){
        let date = new Date();
        this.comment.comment_time = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        this.comment.user_id = window.localStorage.user_id;
        this.comment.comment_body = e.target.value;
        console.log(this.comment);
        fetch(`${this.api}/posts/${e.target.dataset.post}/add-comment`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'auth_token': window.localStorage.getItem('authToken') || null
          },
          body: JSON.stringify(this.comment)
        })
        .then(res => res.json())
        .then((data) => {
          this.post.comments.push(data.comment);
          e.target.value =''
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    like(e){
      let date = new Date();
      let data = {time: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`};
      fetch(`${this.api}/posts/${e.target.dataset.post}/like`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then((data) => {
        if(e.target.classList.contains('btn-primary')){
          e.target.classList.remove('btn-primary');
          e.target.classList.add('btn-danger')
          e.target.textContent = 'unlike'
        } else{
          e.target.classList.add('btn-primary');
          e.target.classList.remove('btn-danger')
          e.target.textContent = 'like'

        }
        this.post.likes = data.likes;
      })
    },
    deletePost(e){
      let postId = e.target.dataset.post;
      fetch(`${this.api}/posts/${postId}`,{
        method: 'delete',
        headers:{
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        }
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.$router.history.push('/');
      })
    }
  }
}
</script>

<style>
</style>

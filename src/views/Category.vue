<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <img :src="category.category_pic" width="100%" >
        <h5>{{ category.category_name}}</h5>
        <p>{{category.category_info}}</p>
      </div>
      <div class="card post col-md-12" v-for="post in posts"">
        <div class="card-body">
          <h3 class="card-title "><router-link :to="'/posts/' + post._id">{{post.title}}</router-link></h3>
          <span class="card-title bold italic"><router-link :to="'/user/' + post.user_id._id">{{post.user_id.username}}</router-link></span>
          <span class="card-title italic">{{post.created_at}}</span>
          <p> {{post.body}} </p>
          <div v-if="post.owner" class="owner">
            <a href="#">تعديل</a>
            <a href="#">حذف</a>
          </div>
          <a :href="'/categories/' + post.category_id.category_name" class="btn btn-primary">#{{post.category_id.category_name}}</a>

          <h5 class="likes">
            <span v-if="!post.likes.indexOf(user_id) ? true : false" class="btn btn-danger" :data-post="post._id" @click="like($event)" role="button">Like</span>
            <span v-if="post.likes.indexOf(user_id) ? true : false" class="btn btn-primary" :data-post="post._id" @click="like($event)" role="button">Like</span>

            <span>{{post.likes.length}}</span>
          </h5>
          <h2 v-if="post.comments.length > 0">comments</h2>
          <ul v-if="post.comments.length > 0" class="comments">
            <li v-for="comment in post.comments">
              <h3>{{comment.user_id.username}}</h3>
              <h4 class="comment-time italic">{{comment.comment_time}}</h4>
              <p class="comment-body">{{comment.comment_body}}</p>
            </li>
          </ul>
          <div class="form-group">
            <input class="form-control"
                   type="text"
                   name="body"
                   :data-post="post._id"
                   @keyup="submitComment($event)">
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return {
      logedIn: false,
      category: {},
      posts: [],
      comment:{
        user_id: window.localStorage.user_id,
        comment_body: '',
        comment_time: ''
      }
    }
  },
  mounted(){
    if(window.localStorage.getItem('authToken')){
      let name = this.$route.params.name;
      fetch('http://127.0.0.1:3000/api/categories/' + name ,{
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
    } else {
      this.logedIn = false;
      window.location.href = 'http://127.0.0.1:8080/login'
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
        fetch(`http://127.0.0.1:3000/api/posts/${e.target.dataset.post}/add-comment`,{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'auth_token': window.localStorage.getItem('authToken') || null
          },
          body: JSON.stringify(this.comment)
        })
        .then(res => res.json())
        .then((data) => {
          this.posts.forEach((post)=>{
            if(post._id === data.post_id){
              post.comments.push(data.comment)
            }
          })
          e.target.value =''
        }).catch((err)=>{
          console.log(err);
        })
      }
    },
    like(e){
      fetch(`http://127.0.0.1:3000/api/posts/${e.target.dataset.post}/like`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        }
      })
      .then(res => res.json())
      .then((data) => {
        if(e.target.classList.contains('btn-primary')){
          e.target.classList.remove('btn-primary');
          e.target.classList.add('btn-danger')
        } else{
          e.target.classList.add('btn-primary');
          e.target.classList.remove('btn-danger')
        }
        this.posts.forEach((post)=>{
          if(post._id === data.post_id){
            post.likes = data.likes;
          }
        })
      })
    }
  }
}
</script>


<style>

</style>

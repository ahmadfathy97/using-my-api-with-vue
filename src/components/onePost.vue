<template>

  <div v-if="logedIn" class="posts">

    <div class="card post">
      <div class="card-body">
        <h3 class="card-title ">{{post.title}}</h3>
        <span class="card-title bold italic">{{post.user_id.username}}</span>
        <span class="card-title italic">{{post.created_at}}</span>
        <p> {{post.body}} </p>
        <a href="#" class="btn btn-primary">#{{post.category_id.category_name}}</a>

        <h5 class="likes">{{post.likes.length > 1 ? post.likes.length + ' likes' : post.likes.length + ' like'}}</h5>
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

</template>


<script>

export default{
  data(){
    return{
      logedIn: false,
      post: {},
      comment:{
        user_id: window.localStorage.user_id,
        comment_body: '',
        comment_time: ''
      }
    }
  },
  props:['post_id'],
  mounted(){
    if( window.localStorage.getItem('authToken')){
      this.logedIn = true;
      let id = this.post_id || ''
      fetch('http://127.0.0.1:3000/api/posts/' + id,{
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
    }
  }
}
</script>

<style>
.post{
  margin: 15px auto;
  padding: 10px 3px;
  background: #eee;
  box-shadow: 0 3px 7px #222
}
.bold{
  font-weight: 900  !important;
}
.italic{
  font-size: 12px;
  font-weight: 200;
  font-style: italic;
}
.post span{
  display: inline-block;
  margin: 5px;
}
li{
  list-style-type: none !important
}
p{
  margin: 5px;
  padding: 3px
}
.comments{
  max-height: 300px;
  overflow-y: auto;

}
.comments li{
  padding: 5px
}
.comments li:nth-child(odd){
  background: #ddd;
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

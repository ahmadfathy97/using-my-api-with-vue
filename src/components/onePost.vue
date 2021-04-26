<template>

  <div>

    <div class="card post bg-light">
      <div class="card-body">
        <h3 class="card-title text-center"><router-link :to="'/posts/' + post._id">{{post.title}}</router-link></h3>
        <span class="card-title bold italic">by: <router-link :to="'/user/' + post.user_id._id">{{post.user_id.username}}</router-link></span>
        <span class="card-title italic">{{post.created_at}}</span>
        <div class="border shadow px-2 py-1" :class="{rtl : post.dir == 'rtl'}" v-html="post.sanitizedHtml"></div>
        <div v-if="post.owner" class="owner">
          <router-link class="btn btn-info" :to="'/posts/edit/' + post._id">edit</router-link>
          <span class="btn btn-danger delete-btn" @dblclick="deletePost($event)" :data-post="post._id" >delete</span>
        </div>
        <router-link :to="'/categories/' + post.category_id.category_name" class="btn btn-primary">#{{post.category_id.category_name}}</router-link>

        <h5 class="likes">
          <span v-if="post.likes.indexOf(user_id) >= 0" class="btn btn-danger" :data-post="post._id" @click="like($event)" role="button">unLike</span>
          <span v-if="post.likes.indexOf(user_id) < 0" class="btn btn-primary" :data-post="post._id" @click="like($event)" role="button">Like</span>
          <!-- <svg width="40px" height="40px" viewBox="0 0 40 40">
            <g>
            	<path fill="#FFFFFF" stroke="#FF1D25" stroke-linecap="round" stroke-miterlimit="10" d="M20.476,7.476c0,0,8.283-9.492,16.544,0
            		c0,0,10.093,8.741-16.544,28.642"/>
            	<path fill="#FFFFFF" stroke="#FF1D25" stroke-linecap="round" stroke-miterlimit="10" d="M20.086,7.476c0,0-8.283-9.492-16.544,0
            		c0,0-10.093,8.741,16.544,28.642"/>
            </g>
          </svg> -->
          <span>{{post.likes.length}}</span>
        </h5>
        <!-- <h2 class="border-bottom border-primary">comments</h2> -->
        <ul ref="commentList" v-show="post.comments.length > 0" class="comments">
          <li v-for="comment in post.comments" class="mb-3">
            <button v-if="comment.user_id._id === user_id"
                    class="btn btn-danger delete-comment m-1 rounded-circle"
                    :data-comment="comment._id"
                    @dblclick="deleteComment($event)">X</button>
            <h3><img :src="comment.user_id.pic" /></h3>
            <h3>
              <router-link :to="'/user/'+comment.user_id._id">
                {{comment.user_id.username}}
              </router-link>
            </h3>
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
import hljs from 'highlight.js';
export default{
  data(){
    return{
      logedIn: false,
      user_id: window.localStorage.getItem('user_id'),
      comment:{
        user_id: window.localStorage.getItem('user_id'),
        comment_body: '',
        comment_time: ''
      }
    }
  },
  computed: mapGetters(["api"]),
  mounted(){
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  },
  props:['post'],
  methods:{
    submitComment(e){
      if(e.keyCode == 13){
        let date = new Date();
        this.comment.comment_time = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        this.comment.user_id = window.localStorage.getItem('user_id');
        this.comment.comment_body = e.target.value;
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
    },
    deleteComment(e){
      let commentId = e.target.dataset.comment;
      console.log(commentId);
      fetch(`${this.api}/comments/${commentId}`,{
        method: 'delete',
        headers:{
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        }
      })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.post.comments = this.post.comments.filter((comment)=>{
          return commentId !== comment._id
        })
      })
    }
  }
}
</script>

<style>
.card-title .router-link-exact-active, .card-title .router-link-active{
  color: #0080ff !important;
  background: transparent !important
}
.post{
  margin: 10px auto;
  padding: 20px 3px;
  background: #eee;
  box-shadow: 0 3px 7px #222;
  position: relative;
}
.rtl{
  direction: rtl !important;
  text-align: right !important;
}
.card-body{
  padding-top: 30px;
}
/*.rtl .owner{
  left: 0;

}*/
.owner{
  position:absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
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
  padding: 5px;
  background: #F3F3F3;
  box-shadow: 0px 8px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;
  position: relative;
}
/* .comments li:nth-child(odd){
  background: #dbeaf8;
} */
.comment-body{
  margin: 10px auto
}
.delete-comment{
  position: absolute;
  top: 2px;right:2px;
  padding: 2px 6px;
}
.likes{
  margin: 30px 10px 5px;
  color: #0080dd;
  font-size: 22px;
}
.delete-btn{
  position: relative;
}
.delete-btn::after{
  display: none;
  content: 'double click to delete';
  min-width: 130px;
  padding: 5px;
  background: #222;
  color: #fff;
  border-radius: 5px;
  position: absolute;
  top: calc(100% + 15px);left: 50%;
  transform: translate(-50%, 0);
  font-size: 12px !important;
}
.delete-btn::before{
  display: none;
  content: '';
  width: 0;height: 0;
  border: 10px solid transparent;
  border-top-color: #000;
  position: absolute;
  top: calc(100% + 2px);left: 50%;
  transform: translate(-50%, 0);
}
.delete-btn:hover::after{
  display: block
}
.delete-btn:hover::before{
  display: block
}
.hljs{display:block;overflow-x:auto;padding:.5em;color:#abb2bf;background:#282c34}.hljs-comment,.hljs-quote{color:#5c6370;font-style:italic}.hljs-doctag,.hljs-formula,.hljs-keyword{color:#c678dd}.hljs-deletion,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-subst{color:#e06c75}.hljs-literal{color:#56b6c2}.hljs-addition,.hljs-attribute,.hljs-meta-string,.hljs-regexp,.hljs-string{color:#98c379}.hljs-built_in,.hljs-class .hljs-title{color:#e6c07b}.hljs-attr,.hljs-number,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-pseudo,.hljs-template-variable,.hljs-type,.hljs-variable{color:#d19a66}.hljs-bullet,.hljs-link,.hljs-meta,.hljs-selector-id,.hljs-symbol,.hljs-title{color:#61aeee}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}.hljs-link{text-decoration:underline}
</style>

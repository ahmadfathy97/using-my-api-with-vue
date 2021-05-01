<template>

  <div>

    <div class="post bg-light shadow m-0 w-100 my-5 rounded px-1 py-3">
      <div>

        <!-- post title and date -->
        <h3 class="d-flex align-items-center justify-content-center flex-column">
          <router-link v-if="$route.params.id !== post._id" :to="'/posts/' + post._id">{{post.title}}</router-link>
          <span v-else>{{post.title}}</span>
          <span class="italic">{{post.created_at}}</span>
        </h3>
        <!-- post owner -->
        <h5 class="mx-3">
          By:<router-link :to="'/user/' + (post.user_id ? post.user_id._id : '')">
            {{post.user_id ? post.user_id.username: ''}}
          </router-link>
        </h5>

        <!-- post -->
        <div class="px-2 py-1" :class="{rtl : post.dir == 'rtl'}" v-html="post.sanitizedHtml"></div>

        <!-- btns for post owner  -->
        <span v-if="post.owner" class="controls bold" @click="controlsOpend = !controlsOpend"> ⠇</span>
        <div v-if="post.owner && controlsOpend" class="owner shadow bg-light  ">
          <router-link class="btn btn-light w-100 m-1" :to="'/posts/edit/' + post._id">edit</router-link>
          <span class="btn btn-light w-100 m-1 delete-btn" @dblclick="deletePost($event)" :data-post="post._id" >delete</span>
        </div>

        <!-- categories -->
        <router-link :to="'/categories/' + (post.category_id ? post.category_id.category_name: '')" class="btn btn-outline-secondary bold mb-5">#{{ post.category_id? post.category_id.category_name : '' }}</router-link>

        <!-- Likes -->
        <h5 class="likes d-flex align-items-center justify-content-center">
          <span class="like-btn btn border border-dark rounded-circle" :class="{'btn-danger': post.likes && (post.likes.indexOf(user_id) >= 0)}" :data-post="post._id" @click="like($event)" role="button">♥</span>
          <span class="bold h4":class="{'text-danger': post.likes && (post.likes.indexOf(user_id) >= 0)}">{{post.likes ? post.likes.length : 0}}</span>
        </h5>

        <!-- comment input -->
        <div class="form-group">
          <textarea
          class="form-control comment-input shadow border border-dark p-2 h2"
          type="text"
          name="body"
          dir="auto"
          :data-post="post._id"
          @keyup.enter="submitComment($event)">
          </textarea>
        </div>

        <!-- comments -->
        <ul ref="commentList" v-show="post.comments && (post.comments.length > 0)" class="comments">
          <li v-for="comment in post.comments" class="mb-3 shadow p-1 px-2 position-relative">
            <button v-if="comment.user_id && (comment.user_id._id === user_id)"
                    class="btn btn-danger delete-comment m-1 rounded-circle"
                    :data-comment="comment._id"
                    @dblclick="deleteComment($event)">X</button>
            <h3 class="d-flex align-items-center justify-content-start">
              <img :src="comment.user_id? comment.user_id.pic : '' " :alt="comment.user_id ? comment.user_id.username.slice(0,1).toUpperCase() : ':)'" class="user-img rounded-circle border border-dark" :style="'background-color:hsl('+ Math.floor(Math.random() * 255) + ', 100%, 50%)'"/>
              <div>
                <router-link class="my-1 d-block" :to="'/user/'+ comment.user_id ? comment.user_id._id: '' ">
                  {{comment.user_id.username}}
                </router-link>
                <h6 class="comment-time italic mx-2">{{comment.comment_time}}</h6>
              </div>
            </h3>
            <p class="comment-body">{{comment.comment_body}}</p>
          </li>
        </ul>
        <div v-if="post.comments && !post.comments.length" class="m-3 h5">
          Write the first comment
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
      controlsOpend: false,
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
      if(!e.shiftKey && e.target.value.trim().length){
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
          e.target.value ='';
          setTimeout(()=>{
            let lastElement = this.$refs.commentList.children[this.$refs.commentList.children.length-1];
            let T = lastElement ? lastElement.offsetTop : 0;
            let H = lastElement ? lastElement.offsetHeight + 50 : 0;
            this.$refs.commentList.scroll(0, T + H);
          }, 1000)
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
          e.target.classList.add('btn-danger');
        } else{
          e.target.classList.add('btn-primary');
          e.target.classList.remove('btn-danger');
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
        if(data.post_id == this.$route.params.id){
          this.$router.history.push('/');
        } else{
          this.$emit('deletingPost', data.post_id)
        }
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
        this.post.comments = this.post.comments.filter((comment)=>{
          return commentId !== comment._id
        })
      })
    }
  }
}
</script>

<style>
.post{
  background: #fff;
  position: relative;
}
.rtl{
  direction: rtl !important;
  text-align: right !important;
}

/*.rtl .owner{
  left: 0;

}*/
.owner, .controls{
  position:absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 8px;
  right: 25px;
}
.owner{
  flex-direction: column;
}
.controls{
  font-size: 28px;
  cursor: pointer;
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
.post hr{
  width: 30%;
    margin: 1rem auto;
    height: 0;
    border: 2px dashed #713cc5;
}
li{
  list-style-type: none !important
}
p{
  margin: 5px;
  padding: 3px
}

.likes{
  margin: 30px 10px 5px;
  color: #0080dd;
}
.like-btn{
  padding: .1rem !important;
  cursor: pointer;
  width: 40px;
  height: 40px;
  font-size: 26px;
}
.like-btn:hover{
  background: #ea6d79
}

.comments{
  max-height: 300px;
  overflow-y: auto;
}
.comments li, .comment-input{
  border-radius: 20px;
}

.comment-body{
  margin: 10px auto
}
.delete-comment{
  position: absolute;
  width: 26px;
  height: 26px;
  top: 2px;right:2px;
  padding: 1px;
  text-align: center
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

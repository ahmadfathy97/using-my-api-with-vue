<!-- <template>

  <div class="posts">
    <div v-if="!posts.length">
      there is no posts yet...
    </div>
    <div class="card post bg-light" v-for="post in posts">
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

          <span>{{post.likes.length}}</span>
        </h5>
        <h2 v-if="post.comments.length > 0">comments</h2>
        <ul v-if="post.comments.length > 0" class="comments">
          <li v-for="comment in post.comments">
            <button v-if="comment.user_id._id === user_id"
                    class="btn btn-danger delete-comment"
                    :data-comment="comment._id"
                    @dblclick="deleteComment($event)">X</button>
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
import hljs from 'highlight.js';

export default{
  data(){
    return{
      logedIn: false,
      user_id:window.localStorage.getItem('user_id'),
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
  props: ['posts'],
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
        this.posts.forEach((post)=>{
          if(post._id === data.post_id){
            post.likes = data.likes;
            console.log(data, post);
          }
        })
      })
    },
    deletePost(e){
      e.preventDefault();
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
        let postsAfterDel = this.posts.filter((post)=>{
          return post._id != data.post_id
        });
        console.log(this.posts.length, this.postsAfterDel);
        this.posts = postsAfterDel;
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
        e.target.parentElement.style.display = 'none';
      })
    }
  }
}
</script>

<style>
.post{
  margin: 15px auto;
  padding: 10px 3px;
  background: #eee;
  box-shadow: 0 3px 7px #222;
  position: relative;
}
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
  background: #e8e8e8;
  margin-bottom: .25rem;
  position: relative;
}
.comments li:nth-child(odd){
  background: #dbeaf8;
}
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
  padding: 5px;
  background: #222;
  color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;left: -200%;
  transform: translate(0, -50%);
  font-size: 12px !important;
}
.delete-btn::before{
  display: none;
  content: '';
  width: 0;height: 0;
  border: 10px solid transparent;
  border-right-color: #000;
  position: absolute;
  top: 50%;left: -22px;
  transform: translate(0, -50%);
}
.delete-btn:hover::after{
  display: block
}
.delete-btn:hover::before{
  display: block
}

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #222;
  -webkit-text-size-adjust: none;
}

.hljs-keyword,
.hljs-literal,
.hljs-change,
.hljs-winutils,
.hljs-flow,
.nginx .hljs-title,
.tex .hljs-special {
  color: white;
}

.hljs,
.hljs-subst {
  color: #ddd;
}

.hljs-string,
.hljs-title,
.hljs-type,
.ini .hljs-title,
.hljs-tag .hljs-value,
.css .hljs-rule .hljs-value,
.hljs-preprocessor,
.hljs-pragma,
.ruby .hljs-symbol,
.ruby .hljs-symbol .hljs-string,
.ruby .hljs-class .hljs-parent,
.hljs-built_in,
.django .hljs-template_tag,
.django .hljs-variable,
.smalltalk .hljs-class,
.hljs-javadoc,
.ruby .hljs-string,
.django .hljs-filter .hljs-argument,
.smalltalk .hljs-localvars,
.smalltalk .hljs-array,
.hljs-attr_selector,
.hljs-pseudo,
.hljs-addition,
.hljs-stream,
.hljs-envvar,
.apache .hljs-tag,
.apache .hljs-cbracket,
.tex .hljs-command,
.hljs-prompt,
.coffeescript .hljs-attribute,
.hljs-name {
  color: #d88;
}

.hljs-comment,
.hljs-annotation,
.hljs-decorator,
.hljs-pi,
.hljs-doctype,
.hljs-deletion,
.hljs-shebang,
.apache .hljs-sqbracket,
.tex .hljs-formula {
  color: #777;
}

.hljs-keyword,
.hljs-literal,
.hljs-title,
.css .hljs-id,
.hljs-phpdoc,
.hljs-dartdoc,
.hljs-type,
.vbscript .hljs-built_in,
.rsl .hljs-built_in,
.smalltalk .hljs-class,
.diff .hljs-header,
.hljs-chunk,
.hljs-winutils,
.bash .hljs-variable,
.apache .hljs-tag,
.tex .hljs-special,
.hljs-request,
.hljs-status {
  font-weight: bold;
}

.coffeescript .javascript,
.javascript .xml,
.tex .hljs-formula,
.xml .javascript,
.xml .vbscript,
.xml .css,
.xml .hljs-cdata {
  opacity: 0.5;
}
</style> -->

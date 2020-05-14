<template>
  <div class="add-post">
    <div v-if="logedIn" class="container d-flex align-items-center justify-content-center flex-column">
      <div class="col-md-12 m-3">
        <h1>Create Post</h1>
      </div>
      <div class="col-md-12 bg-light border shadow p-3">
        <form class="" @submit="post($event)">
          <div class="form-group">
            <label>title</label>
            <input class="form-control" required type="text" name="title" v-model="data.title" />
          </div>
          <div class="form-group">
            <label>Body
              <small class="form-text  text-light rounded bg-dark d-inline-block px-2">
                You can use
                <a class="m-1 p-0" href="https://www.markdownguide.org/cheat-sheet/" rel="noopener" target="_blank">markdown</a>.
              </small>
            </label>
            <textarea class="form-control" required name="info" v-model="data.body"></textarea>

          </div>

          <div class="form-group">
            <label class="d-block">post direction</label>
            <input class="p-2 m-2" required type="radio" id="rtl" name="dir" value="rtl" v-model="data.dir" />
            <label for="rtl">right to left</label>
            <input class="p-2 m-2" required type="radio" id="ltr" name="dir" value="ltr" v-model="data.dir" />
            <label for="ltr">left to right</label>
          </div>

          <div class="form-group">
            <label>Category</label>
            <select class="form-control" name="data.category_id" v-model="data.category_id">
              <template id="" v-for="category in categories">
                <option :value="category._id">{{category.category_name}}</option>
              </template>
            </select>
          </div>
          <div class="form-group">
            <input class="btn btn-primary m-2" type="submit" value="Post" />
            <input class="btn btn-secondary m-2" type="button" @click="Preview()" value="preview" />
          </div>
        </form>
      </div>
      <div v-if="preview" class="post p-3 preview" :class="{rtl: data.dir == 'rtl'}">
        <button v-if="preview" class="btn btn-danger close-preview position-absolute" @click="preview= false">X</button>
        <div v-html="previewContent"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import marked from 'marked';
import DOMPurify from 'dompurify';
export default{
  data(){
    return{
      data:{
        title:'',
        body: '',
        category_id: '',
        created_at: '',
        dir: 'ltr'
      },
      logedIn: true,
      categories: [],
      preview: false,
      previewContent: ''
    }
  },
  computed: mapGetters(["api"]),
  mounted(){
    if(window.localStorage.getItem('authToken')){
      fetch(`${this.api}/categories`,{
        headers: {
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        }
      })
      .then(res=> res.json())
      .then((data)=>{
        this.categories = data
      })
      .catch(err => console.log(err));
    } else {
      this.logedIn = false;
      this.$router.history.push('/login');
    }
  },
  methods:{
    post(e){
      e.preventDefault();
      let date = new Date();
      this.data.created_at = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      fetch(`${this.api}/posts`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        },
        body: JSON.stringify(this.data)
      })
      .then(res=> res.json())
      .then((data)=>{
        console.log(data);
        this.$router.history.push('/posts/' + data.post_id);
      })
      .catch(err => console.log(err));
    },
    Preview(){
      this.previewContent = DOMPurify.sanitize(marked(this.data.body));
      console.log(this.previewContent);
      if(this.previewContent.length){
        this.preview = true
      }
    }
  }
}
</script>

<style>
.add-post.container{
  min-height: 80vh
}
.preview{
  height: 80vh;
  width: 90%;
  padding: 5px 15px;
  position: absolute;
  margin: 20px auto;
  z-index: 999999999999;
}
.preview.rtl{
  direction: rtl !important;
  text-align: right !important;
}
.preview div{
  height: 100%;
  overflow: auto;
}
.close-preview {
  right: 0;
  top: 0
}
</style>

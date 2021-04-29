<template>
  <div class="add-post">
    <div v-if="logedIn" class="container d-flex align-items-center justify-content-center flex-column">
      <div class="col-md-12">
        <h1 class="page-title">edit Post</h1>
      </div>
      <div class="col-md-12 bg-light border shadow p-3">
        <form class="" @submit="editPost($event)">
          <div class="form-group">
            <label>title</label>
            <input dir="auto" class="form-control" required type="text" name="title" v-model="data.title" />
          </div>
          <div class="form-group">
            <label>Body</label>
            <textarea dir="auto" class="form-control" rows="16" required name="info" v-model="data.body"></textarea>
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
              <option :value="oldCategory.id">{{oldCategory.name}}</option>
              <template id="" v-for="category in categories">
                <option v-if="oldCategory.id !== category._id" :value="category._id">{{category.category_name}}</option>
              </template>
            </select>
          </div>
          <div class="form-group">
            <input class="btn btn-primary m-2" type="submit" value="Edit" />
            <input class="btn btn-secondary m-2" type="button" @click="data.body.length ? preview = true: preview = false" value="preview" />
          </div>
        </form>
      </div>
      <PostPreview v-if="preview" :content="data.body" @closePrview="preview= false" :class="{rtl: data.dir == 'rtl'}" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import PostPreview from '../components/PostPreview.vue';
export default{
  data(){
    return{
      data:{
        title:'',
        body: '',
        category_id: '',
        dir: ''
      },
      oldCategory:{
        id: '',
        name: ''
      },
      logedIn: true,
      categories: [],
      preview: false,
    }
  },
  components:{
    PostPreview
  },
  computed: mapGetters(["api"]),
  mounted(){
    fetch(`${this.api}/posts/${this.$route.params.id}` ,{
      headers: {
        'Content-Type': 'application/json',
        'auth_token': window.localStorage.getItem('authToken') || null
      }
    })
    .then(res=> res.json())
    .then((data)=>{
      this.data.title = data.title;
      this.data.body = data.body;
      this.data.dir = data.dir;
      this.oldCategory.id = data.category_id._id;
      this.data.category_id = data.category_id._id;

      this.oldCategory.name = data.category_id.category_name;
      if(data.user_id._id != window.localStorage.getItem('user_id')){
        this.$router.history.push('/posts/' + this.$route.params.id);
      }
      fetch(`${this.api}/categories/`,{
        headers: {
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        }
      })
      .then(res=> res.json())
      .then((data)=>{
        this.categories = data
      })
    })
    .catch(err => console.log(err));
  },
  methods:{
    editPost(e){
      e.preventDefault();
      fetch(`${this.api}/posts/${this.$route.params.id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        },
        body: JSON.stringify(this.data)
      })
      .then(res=> res.json())
      .then((data)=>{
        this.$router.history.push('/posts/' + this.$route.params.id);
      })
      .catch(err => console.log(err));
    }
  }
}
</script>

<style>
.add-post.container{
  min-height: 80vh
}
</style>

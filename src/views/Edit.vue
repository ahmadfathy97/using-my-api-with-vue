<template>
  <div class="add-post">
    <div v-if="logedIn" class="container">
      <div class="col-md-12">
        <h1>edit Post</h1>
      </div>
      <div class="col-md-12">
        <form class="" @submit="editPost($event)">
          <div class="form-group">
            <label>title</label>
            <input class="form-control" required type="text" name="title" v-model="data.title" />
          </div>
          <div class="form-group">
            <label>Body</label>
            <textarea class="form-control" required name="info" v-model="data.body"></textarea>
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
            <input class="form-control btn btn-primary" type="submit" value="Edit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default{
  data(){
    return{
      data:{
        title:'',
        body: '',
        category_id: ''
      },
      oldCategory:{
        id: '',
        name: ''
      },
      logedIn: true,
      categories: []
    }
  },
  computed: mapGetters(["api"]),
  mounted(){
    if(window.localStorage.getItem('authToken')){
      fetch(`${this.api}/posts/${this.$route.params.id}` ,{
        headers: {
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken') || null
        }
      })
      .then(res=> res.json())
      .then((data)=>{
        console.log(data);
        this.data.title = data.title;
        this.data.body = data.body;
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
          console.log(this.categories);
        })
      })
      .catch(err => console.log(err));
    } else {
      this.logedIn = false;
      this.$router.history.push('/login');
    }
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
        console.log(data);
        this.$router.history.push('/posts/' + this.$route.params.id);
      })
      .catch(err => console.log(err));
    }
  }
}
</script>

<style>

</style>

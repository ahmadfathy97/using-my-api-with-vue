<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h1>Categories</h1>
      </div>
      <div class="col-md-4" v-for="category in categories">
        <div class="card" style="width: 100%; margin: 5px;">
          <img class="card-img-top" :src="category.category_pic" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{ category.category_name}}</h5>
            <p class="card-text">{{category.category_info}}</p>
            <a :href="'/categories/'+ category.category_name" class="btn btn-primary">{{ category.category_name}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default{
  data(){
    return {
      logedIn: false,
      categories: []
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
        this.logedIn = true;
        this.categories = data;
      })
      .catch(err => console.log(err));
    } else {
      this.logedIn = false;
      window.location.href = 'http://' + window.location.host + '/login'
    }
  }
}
</script>
<style>

</style>

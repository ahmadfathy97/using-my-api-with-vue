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
            <router-link :to="'/categories/'+ category.category_name" class="btn btn-primary">{{ category.category_name}}</router-link>
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
      logedIn: true,
      categories: []
    }
  },
  computed: mapGetters(["api"]),
  mounted(){
    fetch(`${this.api}/categories`,{
      headers: {
        'Content-Type': 'application/json',
        'auth_token': window.localStorage.getItem('authToken') || null
      }
    })
    .then(res=> res.json())
    .then((data)=>{
      this.categories = data;
    })
    .catch(err => console.log(err));
  }
}
</script>
<style>

</style>

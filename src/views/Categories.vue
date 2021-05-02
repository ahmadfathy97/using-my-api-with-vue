<template>
  <div class="container p-2">
    <div class="row">
      <div class="col-md-12">
        <h1 class="page-title">Categories</h1>
      </div>
      <div class="col-md-4 p-2" v-for="category in [...categories]">
        <router-link class="w-100 rounded shadow position-relative cat-container" :to="'/categories/'+ category.category_name">
          <div class="position-absolute w-100 h-100">
            <img class="w-100 h-100" :src="category.category_pic" :alt="category.category_name">
          </div>
          <div class="position-absolute d-flex align-items-center justify-content-center cat-overlay">
            <h5 class="text-center text-light">{{ category.category_name | capitalize}}</h5>
          </div>
        </router-link>
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
  filters:{
    capitalize(value){
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  mounted(){
    fetch(`${this.api}/categories`,{
      headers: {
        'Content-Type': 'application/json',
        'auth_token': window.localStorage.getItem('authToken') || null
      }
    })
    .then(res=> res.json())
    .then((data)=>{
      this.categories = data.categories;
    })
    .catch(err => console.log(err));
  }
}
</script>
<style>
.cat-container{
  height: 300px;
  overflow: hidden;
}
.cat-container:hover .cat-overlay{
  width: 100%;
  height: 100%;
}
.cat-overlay{
  background: rgba(0,123,255,.9);
  width: 0;
  height: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  transition: all .4s ease;
}
</style>

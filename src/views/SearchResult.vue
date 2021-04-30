<template>
  <div class="search-result">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1 class="page-title">Search Result</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <template v-if="!noResults" v-for="user in users">
            <router-link class="row bg-light d-flex align-items-center" :to="'/user/'+ user._id">
              <img :src="user.pic" :style="'background-color:hsl('+ Math.floor(Math.random() * 255) + ', 100%, 50%);height: 70px;width:70px;overflow: hidden'" class="m-1 rounded-circle" />
              <h2>{{user.username}}</h2>
            </router-link>
          </template>
          <h2 class="alert-info p-1 rounded border border-primary" v-if="noResults"> {{noResults}}</h2>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import { mapGetters } from 'vuex';

export default{
  data(){
    return{
      users: [],
      noResults: '',
      user_id: window.localStorage.getItem('user_id')
    }
  },
  computed: mapGetters(["api"]),
  mounted(){
    let name = this.$route.params.name;
    fetch(`${this.api}/search/?username=${name}`, {
      headers:{
        'Content-Type': 'application/json',
        'auth_token': window.localStorage.getItem('authToken')
      }
    })
    .then(res => res.json())
    .then((data)=>{
      console.log(data);
      if(data && data.success){
        if(data.noResults) this.noResults = data.noResults || 'there is no result found'
        else this.users = data.searchResult
      }
    })
    .catch((err)=>{
      console.log(err);
    });
  }
}
</script>


<style >

</style>

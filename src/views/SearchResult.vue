<template>
  <div class="search-result">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h1>Search Result</h1>
        </div>
        <div class="serch-result-container">
          <div class="" v-for="user in users">
            {{user}}
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
    return{
      users: [],
      user_id: window.localStorage.getItem('user_id')
    }
  },
  computed: mapGetters(["api"]),
  mounted(){
    if(window.localStorage.getItem('authToken')){
      let name = this.$route.params.name;
      fetch(`${this.api}/search/?username=${name}`, {
        headers:{
          'Content-Type': 'application/json',
          'auth_token': window.localStorage.getItem('authToken')
        }
      })
      .then(res => res.json())
      .then((data)=>{
        this.users = data
      })
      .catch((err)=>{
        console.log(err);
      });
    } else{
      window.location.href = 'http://' + window.location.host + '/login'
    }
  }
}
</script>


<style >

</style>
